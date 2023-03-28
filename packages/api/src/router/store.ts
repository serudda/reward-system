import { createTRPCRouter, publicProcedure } from '../trpc';

export const storeRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.store.findMany();
  }),

  getAllWithItems: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.store.findMany({
      include: {
        items: true,
      },
    });
  }),
});
