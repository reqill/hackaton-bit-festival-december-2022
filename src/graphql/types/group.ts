import { extendType, nonNull, objectType, stringArg } from 'nexus';
import { defaultHandler } from './defaults';
import { Task } from './task';
import { User } from './user';

export const Group = objectType({
  name: 'Group',
  definition(t) {
    t.nonNull.string('id');
    t.string('name');
    t.list.field(
      'users',
      defaultHandler({ nexusType: User, thisDbType: 'group', fieldName: 'users' })
    );
    t.field('admin', defaultHandler({ nexusType: User, thisDbType: 'group', fieldName: 'admin' }));
    t.list.field(
      'tasks',
      defaultHandler({ nexusType: Task, thisDbType: 'group', fieldName: 'tasks' })
    );
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
