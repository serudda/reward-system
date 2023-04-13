import {
  createUserHandler,
  getUserByDiscordIdHandler,
  getUserByEmailHandler,
  getUserByProviderHandler,
  getUserHandler,
  getUsersHandler,
  payCoinsByUserIdHandler,
  sendCoinsByGithubIdHandler,
  sendCoinsByUserIdHandler,
} from '../controllers/user.controller';
import {
  createUserInput,
  getUserByDiscordIdInput,
  getUserByEmailInput,
  getUserByProviderInput,
  getUserInput,
  payCoinsByUserIdInput,
  sendCoinsByGithubIdInput,
  sendCoinsByUserIdInput,
} from '../schema/user.schema';
import { createTRPCRouter, publicProcedure } from '../trpc';

export const userRouter = createTRPCRouter({
  getById: publicProcedure.input(getUserInput).query(({ ctx, input }) => getUserHandler({ ctx, input })),

  getByDiscordId: publicProcedure.input(getUserByDiscordIdInput).query(({ ctx, input }) => {
    // TODO: remove when everything works fine
    // return ctx.prisma.user.findUnique({ where: { discordId: input.discordId } });
    return getUserByDiscordIdHandler({ ctx, input });
  }),

  getUserByProvider: publicProcedure
    .input(getUserByProviderInput)
    .query(({ ctx, input }) => getUserByProviderHandler({ ctx, input })),

  getByEmail: publicProcedure
    .input(getUserByEmailInput)
    .query(({ ctx, input }) => getUserByEmailHandler({ ctx, input })),

  getAll: publicProcedure.query(({ ctx }) => getUsersHandler(ctx)),

  create: publicProcedure.input(createUserInput).mutation(async ({ ctx, input }) => {
    return createUserHandler({ ctx, input });
  }),

  sendCoinsByUserId: publicProcedure
    .input(sendCoinsByUserIdInput)
    .mutation(async ({ ctx, input }) => sendCoinsByUserIdHandler({ ctx, input })),

  sendCoinsByGithubId: publicProcedure
    .input(sendCoinsByGithubIdInput)
    .mutation(async ({ ctx, input }) => sendCoinsByGithubIdHandler({ ctx, input })),

  payCoinsByUserId: publicProcedure
    .input(payCoinsByUserIdInput)
    .mutation(async ({ ctx, input }) => payCoinsByUserIdHandler({ ctx, input })),
});
