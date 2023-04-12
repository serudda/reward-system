import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import i18n from '@acme/i18n';
import { Response, TRPCErrorCode } from '../constants';
import { createTRPCRouter, publicProcedure } from '../trpc';

export const accountRouter = createTRPCRouter({
  getAllProvidersByUserId: publicProcedure
    .input(
      z.object({
        userId: z.string(),
      }),
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.account.findMany({
        where: {
          userId: input.userId,
        },
        select: {
          provider: true,
        },
      });
    }),

  create: publicProcedure
    .input(
      z.object({
        type: z.string(),
        provider: z.string(),
        providerAccountId: z.string(),
        providerUsername: z.string().optional(),
        userId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const account = await ctx.prisma.account.create({
          data: {
            provider: input.provider,
            providerAccountId: input.providerAccountId,
            providerUsername: input.providerUsername,
            type: input.type,
            user: {
              connect: { id: input.userId },
            },
          },
        });

        return {
          status: Response.SUCCESS,
          data: {
            account,
          },
        };
      } catch (error: unknown) {
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
    }),
});
