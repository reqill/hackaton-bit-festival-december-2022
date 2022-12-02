import { objectType } from 'nexus';
import { Group } from './group';
import { Task } from './task';

export const User = objectType({
  name: 'User',
  definition(t) {
    t.nonNull.string('id');
    t.string('name');
    t.string('email');
    t.list.field('tasks', {
      type: Task,
      async resolve(_parent, _args, ctx) {
        return await ctx.prisma.user
          .findUnique({
            where: {
              id: _parent.id as string | undefined,
            },
          })
          .tasks();
      },
    });
    t.list.field('groups', {
      type: Group,
      async resolve(_parent, _args, ctx) {
        return await ctx.prisma.user
          .findUnique({
            where: {
              id: _parent.id as string | undefined,
            },
          })
          .groups();
      },
    });
  },
});
