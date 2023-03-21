import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import translate from '../i18n/en.json';
import { createTRPCRouter, publicProcedure } from '../trpc';

const DISCORD_BOT_USERNAME = 'Reward System';

export const botRouter = createTRPCRouter({
  sendDiscordMsg: publicProcedure
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
          content: `
:mega:
---------------
**${input.username}** has been rewarded with **${input.coins}** Indie Tokens :gem:.
→ For merging the following pull request in Develop:
  ${input.prUrl}
---------------
          `,
        };

        if (!input.webhookDiscordUrl) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: `Webhook URL not found: ${input.webhookDiscordUrl}`,
          });
        }

        await fetch(input.webhookDiscordUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        })
          .then(() => console.log(translate.bot.sendDiscordMsg.success))
          .catch((error) => console.error(translate.bot.sendDiscordMsg.error, error));
      } catch (err: any) {
        throw err;
      }
    }),
});
