import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import i18n from '@acme/i18n';

import { TRPCErrorCode } from '../constants';
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
        // TODO: Remove after testing i18n format
        //         const data = {
        //           username: DISCORD_BOT_USERNAME,
        //           content: `\n
        // :mega:
        // ---------------
        // **${input.username}** has been rewarded with **${input.coins}** Indie Tokens :gem:.
        // → For merging the following pull request in Develop:
        //   ${input.prUrl}
        // ---------------
        //           `,
        //         };

        const data = {
          username: DISCORD_BOT_USERNAME,
          content: i18n.t('package.api.bot.sendDiscordMsg.payload', {
            username: input.username,
            coins: input.coins,
            url: input.prUrl,
          }),
        };

        if (!input.webhookDiscordUrl) {
          const message = i18n.t('package.api.bot.sendDiscordMsg.error.webhookNotFound', {
            url: input.webhookDiscordUrl,
          });

          throw new TRPCError({
            code: TRPCErrorCode.NOT_FOUND,
            message,
          });
        }

        await fetch(input.webhookDiscordUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        })
          .then(() => console.log(i18n.t('package.api.bot.sendDiscordMsg.success')))
          .catch((error) => console.error(i18n.t('package.api.bot.sendDiscordMsg.error.internalError'), error));
      } catch (err: any) {
        throw err;
      }
    }),
});
