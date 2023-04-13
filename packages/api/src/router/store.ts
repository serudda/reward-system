import { getStoresHandler, getStoresWithItemsHandler } from '../controllers/store.controller';
import { createTRPCRouter, publicProcedure } from '../trpc';

export const storeRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => getStoresHandler(ctx)),

  getAllWithItems: publicProcedure.query(({ ctx }) => getStoresWithItemsHandler(ctx)),
});
