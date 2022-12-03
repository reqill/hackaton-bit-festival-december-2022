import { arg, extendType, nonNull, objectType, stringArg } from 'nexus';
import { Task } from './task';
import { User } from './user';

export const Group = objectType({
  name: 'Group',
  definition(t) {
    t.nonNull.string('id');
    t.string('name');
    t.list.field('users', {
      type: User,
      async resolve(_parent, _args, ctx) {
        return await ctx.prisma.group
          .findUnique({
            where: {
              id: _parent.id as string | undefined,
            },
          })
          .users();
      },
    });
    t.field('admin', {
      type: User,
      async resolve(_parent, _args, ctx) {
        return await ctx.prisma.group
          .findUnique({
            where: {
              id: _parent.id as string | undefined,
            },
          })
          .admin();
      },
    });
    t.list.field('tasks', {
      type: Task,
      async resolve(_parent, _args, ctx) {
        return await ctx.prisma.group
          .findUnique({
            where: {
              id: _parent.id as string | undefined,
            },
          })
          .tasks();
      },
    });
  },
});

export const CreateateGroupMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('createGroup', {
      type: 'Group',
      args: {
        name: nonNull(stringArg()),
      },
      resolve(_root, args, ctx) {
        return ctx.prisma.group.create({
          data: {
            name: args.name,
            admin: { connect: { id: ctx.user?.id } },
            users: { connect: { id: ctx.user?.id } },
          },
        });
      },
    });
  },
});

export const AddToGroupMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('addToGroup', {
      type: 'Group',
      args: {
        email: nonNull(stringArg()),
        groupId: nonNull(stringArg()),
      },
      resolve(_root, args, ctx) {
        return ctx.prisma.group.update({
          where: { id: args.groupId },
          data: { users: { connect: { email: args.email } } },
        });
      },
    });
  },
});
