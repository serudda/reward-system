import { z } from 'zod';
import i18n from '@acme/i18n';
import { createTRPCRouter, publicProcedure } from '../trpc';
import { sendDiscordMsg } from '../utils/functions';

const DISCORD_BOT_USERNAME = 'Reward System';

export const botRouter = createTRPCRouter({
  sendRewardMsg: publicProcedure
    .input(
      z.object({
        username: z.string(),
        prUrl: z.string(),
        coins: z.string(),
        webhookDiscordUrl: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      try {
        const data = {
          username: DISCORD_BOT_USERNAME,
          content: i18n.t('package.api.bot.sendDiscordMsg.payload', {
            username: input.username,
            coins: input.coins,
            url: input.prUrl,
          }),
        };
        await sendDiscordMsg(input.webhookDiscordUrl, data);
      } catch (err) {
        throw err;
      }
    }),
  sendIssueMsg: publicProcedure
    .input(
      z.object({
        author: z.object({
          name: z.string(),
          url: z.string(),
          icon_url: z.string(),
        }),
        title: z.string(),
        content: z.string(),
        url: z.string(),
        color: z.string(),
        webhookDiscordUrl: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      try {
        const data = {
          embeds: [
            {
              title: input.title,
              url: input.url,
              description: `${input.content}`,
              author: input.author,
              color: input.color,
              // TODO: Add Indie Tokens property
              // footer: {
              //   text: `💎${input.coins} Indie Tokens`,
              // },
            },
          ],
        };
        await sendDiscordMsg(input.webhookDiscordUrl, data);
      } catch (err) {
        throw err;
      }
    }),
});
