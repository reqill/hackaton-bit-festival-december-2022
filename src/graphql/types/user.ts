import { extendType, objectType } from 'nexus';
import { defaultHandler } from './defaults';
import { Group } from './group';
import { Task } from './task';

export const User = objectType({
  name: 'User',
  definition(t) {
    t.nonNull.string('id');
    t.string('name');
    t.string('email');
    t.list.field(
      'tasks',
      defaultHandler({ nexusType: Task, thisDbType: 'user', fieldName: 'tasks' })
    );
    t.list.field(
      'groups',
      defaultHandler({ nexusType: Group, thisDbType: 'user', fieldName: 'groups' })
    );
    t.list.field(
      'adminOf',
      defaultHandler({ nexusType: Group, thisDbType: 'user', fieldName: 'adminOf' })
    );
  },
});

export const MeQuery = extendType({
  type: 'Query',
  definition(t) {
    t.field('me', {
      type: 'User',
      resolve(_parent, _args, ctx) {
        return ctx.prisma.user.findUnique({
          where: { id: ctx.user?.id },
        });
      },
    });
  },
});
