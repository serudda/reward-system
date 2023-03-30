import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import { createTRPCRouter, protectedProcedure, publicProcedure } from '../trpc';

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

  buyItem: protectedProcedure
    .input(
      z.object({
        itemId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const user = await ctx.prisma.user.findUnique({ where: { id: ctx.session.user.id } });
        const item = await ctx.prisma.item.findUnique({ where: { id: input.itemId } });

        // Check if user and item exist
        if (!user || !item) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: `Usuario o ítem no encontrado`,
          });
        }

        // Check if user has enough coins
        if (user.coins < item.price) {
          throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: `Saldo insuficiente`,
          });
        }

        // Check if item has enough stock
        if (item.stock === 0) {
          throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: `Stock insuficiente`,
          });
        }

        // Update user coins and item stock
        await ctx.prisma.$transaction([
          ctx.prisma.user.update({
            where: { id: ctx.session.user.id },
            data: { coins: { decrement: item.price } },
          }),
          ctx.prisma.item.update({
            where: { id: input.itemId },
            data: { stock: { decrement: 1 } },
          }),
          ctx.prisma.purchase.create({
            data: {
              userId: ctx.session.user.id,
              itemId: input.itemId,
              quantity: 1,
            },
          }),
        ]);
      } catch (err: any) {
        throw err;
      }
    }),
});
