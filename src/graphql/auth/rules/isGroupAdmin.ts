import { rule } from 'graphql-shield';
export const isGroupAdmin = rule({ cache: 'contextual' })(async (_parent, args, ctx) => {
  try {
    const user = await ctx.prisma.group.findUnique({ where: { id: args.groupId } }).admin();
    if (user) {
      return user.id == ctx.user.id;
    }
  } catch {
    return false;
  }

  return false;
});
