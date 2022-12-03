import {
  enumType,
  extendType,
  inputObjectType,
  nonNull,
  nullable,
  objectType,
  stringArg,
} from 'nexus';
import { Group } from './group';
import { User } from './user';
const Importance = enumType({
  name: 'Importance',
  members: ['CRITICAL', 'HIGH', 'MEDIUM', 'LOW'],
});

export const Task = objectType({
  name: 'Task',
  definition(t) {
    t.nonNull.string('id');
    t.string('name');
    t.boolean('planned');
    t.nullable.string('startDate');
    t.nullable.string('endDate');
    t.field('importance', { type: Importance });
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
export const EventMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('addEvent', {
      type: 'Task',
      args: {
        name: nonNull(stringArg()),
        importance: nonNull(ImportanceInput),
        startDate: nonNull(stringArg()),
        endDate: nonNull(stringArg()),
      },
      resolve(_root, args, ctx) {
        return ctx.prisma.task.create({
          data: {
            name: args.name,
            planned: true,
            importance: args.importance.importance,
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
      },
      resolve(_root, args, ctx) {
        return ctx.prisma.task.create({
          data: {
            name: args.name,
            planned: false,
            importance: args.importance.importance,
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
        groupId: nonNull(stringArg()),
      },
      resolve(_root, args, ctx) {
        return ctx.prisma.task.create({
          data: {
            name: args.name,
            planned: false,
            importance: args.importance.importance,
            group: { connect: { id: args.groupId } },
          },
        });
      },
    });
  },
});
