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
        const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
        const data = {
          username: 'El Banco',
          content: `El pull request #${input.prUrl} ha sido mergeado en Develop. Se otorgan ${input.coins} puntos a ${input.username}.`,
        };

        if (!webhookUrl) {
          console.log('input TEST ENTRO: ', input);
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'Webhook URL not found',
          });
        }

        fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        })
          .then(() => console.log('Mensaje enviado correctamente.'))
          .catch((error) => console.error('Error al enviar mensaje:', error));
        // if (!user) {
        //   throw new TRPCError({
        //     code: 'NOT_FOUND',
        //     message: 'User with that ID not found',
        //   });
        // }
      } catch (err: any) {
        throw err;
      }
    }),
});
