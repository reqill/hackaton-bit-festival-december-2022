import { allow, shield } from 'graphql-shield';
export const permissions = shield(
  {
    Query: {
      '*': allow,
    },
  },
  {
    debug: true,
  }
);
