import { Prisma } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import i18n from '@acme/i18n';

import { PrismaErrorCode, TRPCErrorCode } from '../constants';
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
          const message = i18n.t('package.api.item.buyItem.error.notFound');
          throw new TRPCError({
            code: TRPCErrorCode.INTERNAL_SERVER_ERROR,
            message,
          });
        }

        // Check if user has enough coins
        if (user.coins < item.price) {
          const message = i18n.t('package.api.item.buyItem.error.insufficientBalance');
          throw new TRPCError({
            code: TRPCErrorCode.INTERNAL_SERVER_ERROR,
            message,
          });
        }

        // Check if item has enough stock
        if (item.stock === 0) {
          const message = i18n.t('package.api.item.buyItem.error.insufficientStock');
          throw new TRPCError({
            code: TRPCErrorCode.INTERNAL_SERVER_ERROR,
            message,
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
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          if (error.code === PrismaErrorCode.UniqueConstraintViolation) {
            const message = i18n.t('package.api.item.buyItem.error.userAlreadyExists');
            throw new TRPCError({
              code: TRPCErrorCode.CONFLICT,
              message,
            });
          }
        }
        const message = i18n.t('common.message.error.internalError');
        throw new TRPCError({
          code: TRPCErrorCode.INTERNAL_SERVER_ERROR,
          message,
        });
      }
    }),
});
