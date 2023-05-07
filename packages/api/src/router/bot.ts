import { sendDiscordMsgHandler, sendDiscordRewardMsgHandler } from '../controllers/bot.controller';
import { sendDiscordGitHubMsgInput, sendDiscordMsgInput } from '../schema/bot.schema';
import { createTRPCRouter, publicProcedure } from '../trpc';

export const botRouter = createTRPCRouter({
  sendDiscordMsg: publicProcedure
    .input(sendDiscordMsgInput)
    .mutation(async ({ input }) => sendDiscordRewardMsgHandler(input)),
  sendDiscordGitHubMsg: publicProcedure
    .input(sendDiscordGitHubMsgInput)
    .mutation(async ({ input }) => sendDiscordMsgHandler(input)),
});
