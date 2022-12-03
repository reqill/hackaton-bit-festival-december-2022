import { allow, shield } from 'graphql-shield';
import { isGroupAdmin } from './rules/isGroupAdmin';
import { isLoggedIn } from './rules/isLoggedIn';
export const permissions = shield(
  {
    Query: {
      '*': allow,
    },
    Mutation: {
      addTask: isLoggedIn,
      addEvent: isLoggedIn,
      createGroup: isLoggedIn,
      addGroupTask: isGroupAdmin,
      addGroupEvent: isGroupAdmin,
      addToGroup: isGroupAdmin,
      findGroupFit: isGroupAdmin,
    },
  },
  {
    debug: true,
  }
);
