import { objectType } from 'nexus';
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
  },
});
