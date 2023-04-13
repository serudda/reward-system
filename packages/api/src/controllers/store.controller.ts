import { type Ctx } from '../common';

export const getStoresHandler = async (ctx: Ctx) => {
  return ctx.prisma.store.findMany();
};

export const getStoresWithItemsHandler = async (ctx: Ctx) => {
  return ctx.prisma.store.findMany({
    include: {
      items: true,
    },
  });
};
