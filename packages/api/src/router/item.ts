import { z } from 'zod';

import { createTRPCRouter, publicProcedure } from '../trpc';

export const itemRouter = createTRPCRouter({
  getByStoreId: publicProcedure
    .input(
      z.object({
        storeId: z.string(),
      }),
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.item.findMany({ where: { storeId: input.storeId } });
    }),
});
