import { sendDiscordMsgHandler } from '../controllers/bot.controller';
import { sendDiscordMsgInput } from '../schema/bot.schema';
import { createTRPCRouter, publicProcedure } from '../trpc';

export const botRouter = createTRPCRouter({
  sendDiscordMsg: publicProcedure
    .input(sendDiscordMsgInput)
    .mutation(async ({ input }) => sendDiscordMsgHandler(input)),
});
