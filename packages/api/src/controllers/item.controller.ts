import { Prisma } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import i18n from '@acme/i18n';
import { PrismaErrorCode, TRPCErrorCode, type Params } from '../common';
import { BuyItemInputType, GetItemsByStoreIdInputInputType } from '../schema/item.schema';

export const getItemsByStoreIdHandler = async ({ ctx, input }: Params<GetItemsByStoreIdInputInputType>) => {
  return ctx.prisma.item.findMany({ where: { storeId: input.storeId } });
};

export const buyItemHandler = async ({ ctx, input }: Params<BuyItemInputType>) => {
  try {
    if (!ctx.session) {
      const message = i18n.t('common.message.error.unauthorized');
      throw new TRPCError({
        code: TRPCErrorCode.UNAUTHORIZED,
        message,
      });
    }

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
  } catch (error: unknown) {
    // Prisma error (Database issue)
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === PrismaErrorCode.UniqueConstraintViolation) {
        const message = i18n.t('package.api.item.buyItem.error.userAlreadyExists');
        throw new TRPCError({
          code: TRPCErrorCode.CONFLICT,
          message,
        });
      }
    }

    // Zod error (Invalid input)
    if (error instanceof z.ZodError) {
      const message = i18n.t('package.api.item.buyItem.error.invalidItemId');
      throw new TRPCError({
        code: TRPCErrorCode.BAD_REQUEST,
        message,
      });
    }

    // TRPC error (Custom error)
    if (error instanceof TRPCError) {
      if (error.code === TRPCErrorCode.UNAUTHORIZED) {
        const message = i18n.t('common.message.error.unauthorized');
        throw new TRPCError({
          code: TRPCErrorCode.UNAUTHORIZED,
          message,
        });
      }

      throw new TRPCError({
        code: TRPCErrorCode.INTERNAL_SERVER_ERROR,
        message: error.message,
      });
    }
  }
};
