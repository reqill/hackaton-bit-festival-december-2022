import { Session } from '@auth0/nextjs-auth0';
import { PrismaClient } from '@prisma/client';
import { User } from '../context';
export const validateUser = async (session: Session | null | undefined, prisma: PrismaClient) => {
  if (!session) {
    return;
  }
  var user = await prisma.user.findUnique({
    where: {
      id: session.user.sub,
    },
  });
  if (user) {
    return user;
  }
  const userData: User = {
    id: session.user.sub,
    email: session.user.email,
    username: session.user.email,
  };
  user = await prisma.user.create({ data: { ...userData } });
  return user;
};
