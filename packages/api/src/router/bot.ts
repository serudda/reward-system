import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import { createTRPCRouter, publicProcedure } from '../trpc';

export const botRouter = createTRPCRouter({
  sendDiscordMsg: publicProcedure
    .input(
      z.object({
        username: z.string(),
        prUrl: z.string(),
        coins: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      try {
        const webhookUrl =
          'https://discord.com/api/webhooks/1077255069281562684/9zZBqAqHPmH9skQkQ1FNZsGIt0VtciwwyfJQT_NDQTzZoYE05YZomNm27f8erX6wZug3';
        const data = {
          username: 'Reward System',
          content: `
          @${input.username} has been rewarded with ${input.coins} Indie Tokens.
          For merging the following pull request in Develop:
          ${input.prUrl}`,
        };

        if (!webhookUrl) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: `Webhook URL not found: ${webhookUrl}`,
          });
        }

        await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        })
          .then(() => console.log('Mensaje enviado correctamente.'))
          .catch((error) => console.error('Error al enviar mensaje:', error));
      } catch (err: any) {
        throw err;
      }
    }),
});
