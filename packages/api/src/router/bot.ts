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
          username: 'El Banco',
          content: `El pull request #${input.prUrl} ha sido mergeado en Develop. Se otorgan ${input.coins} puntos a ${input.username}.`,
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
