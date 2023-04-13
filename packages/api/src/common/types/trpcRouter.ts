import { PrismaClient } from '@prisma/client';
import { Session } from 'next-auth';

export type Ctx = {
  prisma: PrismaClient;
  session: Session | null;
};

export type Params<T> = {
  ctx: Ctx;
  input: T;
};
