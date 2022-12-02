import { enumType, extendType, objectType } from 'nexus';
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
    t.string('startDate');
    t.string('endDate');
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
  },
});
