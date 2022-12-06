import { Task as dbTask } from '@prisma/client';
import {
  enumType,
  extendType,
  inputObjectType,
  intArg,
  nonNull,
  objectType,
  stringArg,
} from 'nexus';
import { defaultHandler, formatDate } from './defaults';
import { Group } from './group';
import { User } from './user';
const Importance = enumType({
  name: 'Importance',
  members: ['CRITICAL', 'HIGH', 'MEDIUM', 'LOW'],
});
const TaskType = enumType({
  name: 'Type',
  members: ['SCHOOL', 'WORK', 'FRIENDS', 'FAMILY'],
});
export const Task = objectType({
  name: 'Task',
  definition(t) {
    t.nonNull.string('id');
    t.string('name');
    t.boolean('planned');
    t.nullable.string('startDate');
    t.nullable.string('endDate');
    t.nullable.int('suspectedDuration');
    t.field('importance', { type: Importance });
    t.field('taskType', { type: TaskType });
    t.list.field(
      'users',
      defaultHandler({ nexusType: User, thisDbType: 'task', fieldName: 'users' })
    );
    t.nullable.field(
      'group',
      defaultHandler({ nexusType: Group, thisDbType: 'task', fieldName: 'group' })
    );
  },
});
export const ImportanceInput = inputObjectType({
  name: 'importanceInput',
  definition(t) {
    t.nonNull.field('importance', { type: Importance });
  },
});
export const TypeInput = inputObjectType({
  name: 'typeInput',
  definition(t) {
    t.nonNull.field('taskType', { type: TaskType });
  },
});

const createTaskMutation = (planned: boolean, group: boolean) => {
  const basicArgs: any = {
    name: nonNull(stringArg()),
    importance: nonNull(ImportanceInput),
    taskType: nonNull(TypeInput),
  };
  var queryName = 'add';
  if (group) {
    queryName += 'Group';
    basicArgs.groupId = nonNull(stringArg());
  }
  if (planned) {
    queryName += 'Event';
    basicArgs.startDate = nonNull(stringArg());
    basicArgs.endDate = nonNull(stringArg());
  } else {
    queryName += 'Task';
    basicArgs.suspectedDuration = intArg();
  }

  return extendType({
    type: 'Mutation',
    definition(t) {
      t.nonNull.field(queryName, {
        type: 'Task',
        args: basicArgs,
        resolve(_root, args, ctx) {
          const basicData: any = {
            name: args.name,
            planned: planned,
            importance: args.importance.importance,
            taskType: args.taskType.taskType,
            users: { connect: { id: ctx?.user?.id } },
          };
          if (planned) {
            basicData.startDate = args.startDate;
            basicData.endDate = args.endDate;
          } else {
            basicData.suspectedDuration = args.suspectedDuration;
          }
          if (group) {
            basicData.group = { connect: { id: args.groupId } };
          } else {
            basicData.users = { connect: { id: ctx?.user?.id } };
          }
          return ctx.prisma.task.create({
            data: basicData,
          });
        },
      });
    },
  });
};

export const EventMutation = createTaskMutation(true, false);
export const TaskMutation = createTaskMutation(false, false);
export const GroupEventMutation = createTaskMutation(true, true);
export const GroupTaskMutation = createTaskMutation(false, true);

export const FindPersonalFitMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('findFit', {
      type: 'Task',
      args: {
        taskId: nonNull(stringArg()),
        startDate: nonNull(stringArg()),
        endDate: nonNull(stringArg()),
        minStartTime: intArg(),
        maxEndTime: intArg(),
        calculationInterval: intArg(),
      },
      resolve(_root, args, ctx) {
        const calcInterv = args.calculationInterval || 30;
        let startDate = new Date(args.startDate);
        let endDate = new Date(args.endDate);
        const difference = endDate.getTime() - startDate.getTime();
        const intervalCount = difference / (1000 * 60 * calcInterv);

        const intervals: { CRITICAL: boolean; HIGH: boolean; MEDIUM: boolean; LOW: boolean }[] = [];
        for (let i = 0; i < intervalCount; i++) {
          intervals.push({ CRITICAL: false, HIGH: false, MEDIUM: false, LOW: false });
        }

        const getDateString = (idx: number) => {
          const date = new Date(startDate.getTime() + idx * calcInterv * 60 * 1000);
          return date.toString();
        };

        const validateDate = (date: Date) => {
          let ok: boolean = true;
          let intervalMinutes = date.getHours() * 60 + date.getMinutes();
          if (args.minStartTime) {
            if (intervalMinutes < args.minStartTime) {
              ok = false;
            }
          }
          if (args.maxEndTime) {
            if (intervalMinutes > args.maxEndTime) {
              ok = false;
            }
          }
          return ok;
        };
        const getInterval = (date: string) => {
          const intervalDate = new Date(date);
          let interval: number =
            (intervalDate.getTime() - startDate.getTime()) / (1000 * 60 * calcInterv);
          if (interval < 0 || interval > intervalCount) {
            return undefined;
          }
          if (validateDate(intervalDate)) {
            return interval;
          }
          return undefined;
        };
        ctx.prisma.user
          .findUnique({
            where: { id: ctx.user?.id },
            include: { tasks: true, groups: { include: { tasks: true } } },
          })
          .then((user: any) => {
            const tasks = user.tasks;
            user.groups.forEach((g: any) => {
              tasks.push(...g.tasks);
            });
            if (tasks) {
              tasks.forEach((task: dbTask) => {
                if (task.startDate && task.endDate) {
                  let s = getInterval(task.startDate);
                  let e = getInterval(task.endDate);
                  if (s && e) {
                    for (let i = s; i <= e; i++) {
                      intervals[i][task.importance] = true;
                    }
                  }
                }
              });

              const taskLength =
                tasks.filter((t: any) => t.id == args.taskId)[0].suspectedDuration / calcInterv;
              for (let i = 0; i < intervalCount - taskLength; i++) {
                let succes: boolean = true;
                for (let x = 0; x < taskLength; x++) {
                  const intDate = getDateString(i + x);
                  if (
                    validateDate(new Date(intDate)) &&
                    !(
                      intervals[i + x].CRITICAL ||
                      intervals[i + x].HIGH ||
                      intervals[i + x].LOW ||
                      intervals[i + x].MEDIUM
                    )
                  ) {
                  } else succes = false;
                }
                if (succes) {
                  return ctx.prisma.task.update({
                    where: { id: args.taskId },
                    data: {
                      planned: true,
                      startDate: formatDate(new Date(getDateString(i))),
                      endDate: formatDate(new Date(getDateString(i + taskLength))),
                    },
                  });
                }
              }
            }
          });
      },
    });
  },
});

export const FindGroupFitMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('findGroupFit', {
      type: 'Task',
      args: {
        taskId: nonNull(stringArg()),
        startDate: nonNull(stringArg()),
        endDate: nonNull(stringArg()),
        groupId: nonNull(stringArg()),
        minStartTime: intArg(),
        maxEndTime: intArg(),
        calculationInterval: intArg(),
      },
      resolve(_root, args, ctx) {
        const calcInterv = args.calculationInterval || 30;
        let startDate = new Date(args.startDate);
        let endDate = new Date(args.endDate);
        const difference = endDate.getTime() - startDate.getTime();
        const intervalCount = difference / (1000 * 60 * calcInterv);

        const intervals: { CRITICAL: boolean; HIGH: boolean; MEDIUM: boolean; LOW: boolean }[] = [];
        for (let i = 0; i < intervalCount; i++) {
          intervals.push({ CRITICAL: false, HIGH: false, MEDIUM: false, LOW: false });
        }

        const getDateString = (idx: number) => {
          const date = new Date(startDate.getTime() + idx * calcInterv * 60 * 1000);
          return date.toString();
        };

        const validateDate = (date: Date) => {
          let ok: boolean = true;
          let intervalMinutes = date.getHours() * 60 + date.getMinutes();
          if (args.minStartTime) {
            if (intervalMinutes < args.minStartTime) {
              ok = false;
            }
          }
          if (args.maxEndTime) {
            if (intervalMinutes > args.maxEndTime) {
              ok = false;
            }
          }
          return ok;
        };
        const getInterval = (date: string) => {
          const intervalDate = new Date(date);
          let interval: number =
            (intervalDate.getTime() - startDate.getTime()) / (1000 * 60 * calcInterv);
          if (interval < 0 || interval > intervalCount) {
            return undefined;
          }
          if (validateDate(intervalDate)) {
            return interval;
          }
          return undefined;
        };
        ctx.prisma.group
          .findUnique({
            where: { id: args.groupId },
            include: { tasks: true, users: { include: { tasks: true } } },
          })
          .then((group: any) => {
            const tasks = group.tasks;
            group.users.forEach((u: any) => {
              tasks.push(...u.tasks);
            });
            if (tasks) {
              tasks.forEach((task: dbTask) => {
                if (task.startDate && task.endDate) {
                  let s = getInterval(task.startDate);
                  let e = getInterval(task.endDate);
                  if (s && e) {
                    for (let i = s; i <= e; i++) {
                      intervals[i][task.importance] = true;
                    }
                  }
                }
              });
              const taskLength =
                tasks.filter((t: any) => t.id == args.taskId)[0].suspectedDuration / calcInterv;
              for (let i = 0; i < intervalCount - taskLength; i++) {
                let succes: boolean = true;
                for (let x = 0; x < taskLength; x++) {
                  const intDate = getDateString(i + x);
                  if (
                    validateDate(new Date(intDate)) &&
                    !(
                      intervals[i + x].CRITICAL ||
                      intervals[i + x].HIGH ||
                      intervals[i + x].LOW ||
                      intervals[i + x].MEDIUM
                    )
                  ) {
                  } else succes = false;
                }
                if (succes) {
                  return ctx.prisma.task.update({
                    where: { id: args.taskId },
                    data: {
                      planned: true,
                      startDate: formatDate(new Date(getDateString(i))),
                      endDate: formatDate(new Date(getDateString(i + taskLength))),
                    },
                  });
                }
              }
            }
          });
      },
    });
  },
});
