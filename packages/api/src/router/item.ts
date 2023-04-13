import { buyItemHandler, getItemsByStoreIdHandler } from '../controllers/item.controller';
import { buyItemInput, getItemsByStoreIdInput } from '../schema/item.schema';
import { createTRPCRouter, protectedProcedure, publicProcedure } from '../trpc';

export const itemRouter = createTRPCRouter({
  getByStoreId: publicProcedure
    .input(getItemsByStoreIdInput)
    .query(({ ctx, input }) => getItemsByStoreIdHandler({ ctx, input })),

  buyItem: protectedProcedure.input(buyItemInput).mutation(async ({ ctx, input }) => {
    return buyItemHandler({ ctx, input });
  }),
});
