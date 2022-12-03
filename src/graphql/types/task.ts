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
    t.list.field('users', {
      type: User,
      async resolve(_parent, _args, ctx) {
        return await ctx.prisma.task
          .findUnique({
            where: {
              id: _parent.id as string | undefined,
            },
          })
          .users();
      },
    });
    t.nullable.field('group', {
      type: Group,
      async resolve(_parent, _args, ctx) {
        return await ctx.prisma.task
          .findUnique({
            where: {
              id: _parent.id as string | undefined,
            },
          })
          .group();
      },
    });
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
export const EventMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('addEvent', {
      type: 'Task',
      args: {
        name: nonNull(stringArg()),
        importance: nonNull(ImportanceInput),
        type: nonNull(TypeInput),
        startDate: nonNull(stringArg()),
        endDate: nonNull(stringArg()),
      },
      resolve(_root, args, ctx) {
        return ctx.prisma.task.create({
          data: {
            name: args.name,
            planned: true,
            importance: args.importance.importance,
            taskType: args.taskType.taskType,
            startDate: args.startDate,
            endDate: args.endDate,
            users: { connect: { id: ctx?.user?.id } },
          },
        });
      },
    });
  },
});
export const TaskMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('addTask', {
      type: 'Task',
      args: {
        name: nonNull(stringArg()),
        importance: nonNull(ImportanceInput),
        taskType: nonNull(TypeInput),
        suspectedDuration: intArg(),
      },
      resolve(_root, args, ctx) {
        return ctx.prisma.task.create({
          data: {
            name: args.name,
            planned: false,
            taskType: args.taskType.taskType,
            importance: args.importance.importance,
            suspectedDuration: args.suspectedDuration,
            users: { connect: { id: ctx?.user?.id } },
          },
        });
      },
    });
  },
});

export const GroupEventMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('addGroupEvent', {
      type: 'Task',
      args: {
        name: nonNull(stringArg()),
        importance: nonNull(ImportanceInput),
        taskType: nonNull(TypeInput),
        startDate: nonNull(stringArg()),
        endDate: nonNull(stringArg()),
        groupId: nonNull(stringArg()),
      },
      resolve(_root, args, ctx) {
        return ctx.prisma.task.create({
          data: {
            name: args.name,
            planned: true,
            importance: args.importance.importance,
            tytaskTypepe: args.taskType.taskType,
            startDate: args.startDate,
            endDate: args.endDate,
            group: { connect: { id: args.groupId } },
          },
        });
      },
    });
  },
});
export const GroupTaskMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('addGroupTask', {
      type: 'Task',
      args: {
        name: nonNull(stringArg()),
        importance: nonNull(ImportanceInput),
        taskType: nonNull(TypeInput),
        groupId: nonNull(stringArg()),
        suspectedDuration: intArg(),
      },
      resolve(_root, args, ctx) {
        return ctx.prisma.task.create({
          data: {
            name: args.name,
            planned: false,
            importance: args.importance.importance,
            taskType: args.taskType.taskType,
            suspectedDuration: args.suspectedDuration,
            group: { connect: { id: args.groupId } },
          },
        });
      },
    });
  },
});

const formatDate = (date: Date) => {
  return (
    date.getFullYear().toString() +
    '/' +
    (date.getMonth() + 1).toLocaleString('en-US', {
      minimumIntegerDigits: 2,
      useGrouping: false,
    }) +
    '/' +
    date.getDate().toLocaleString('en-US', {
      minimumIntegerDigits: 2,
      useGrouping: false,
    }) +
    ' ' +
    date.getHours().toLocaleString('en-US', {
      minimumIntegerDigits: 2,
      useGrouping: false,
    }) +
    ':' +
    date.getMinutes().toLocaleString('en-US', {
      minimumIntegerDigits: 2,
      useGrouping: false,
    })
  );
};

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
