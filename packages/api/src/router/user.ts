import { z } from 'zod';

import { createTRPCRouter, protectedProcedure, publicProcedure } from '../trpc';

export const userRouter = createTRPCRouter({
  getByDiscordId: publicProcedure.input(z.object({ discordId: z.string() })).query(({ ctx, input }) => {
    return ctx.prisma.user.findUnique({ where: { discordId: input.discordId } });
  }),

  getByEmail: publicProcedure.input(z.object({ email: z.string() })).query(({ ctx, input }) => {
    return ctx.prisma.user.findUnique({ where: { email: input.email } });
  }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.user.findMany();
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return 'you can now see this secret message!';
  }),
});
