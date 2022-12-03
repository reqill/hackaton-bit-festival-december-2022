import { rule } from 'graphql-shield';
export const isLoggedIn = rule({ cache: 'contextual' })(async (_parent, _args, ctx) => {
  return Boolean(ctx.user);
});
