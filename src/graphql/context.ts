import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export type Context = {
  prisma: PrismaClient;
};
export async function createContext({ req, res }: { req: any; res: any }): Promise<Context> {
  return {
    prisma: prisma,
  };
}
