/* Dependencies */
import { type User } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';

/* tRCP Config */
import { createTRPCRouter, protectedProcedure, publicProcedure } from '../trpc';
/* Utils */
import setTempThumbnail from '../utils/setTempThumbnail';

export const userRouter = createTRPCRouter({
  getByDiscordId: publicProcedure
    .input(
      z.object({
        discordId: z.string(),
      }),
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.user.findUnique({ where: { discordId: input.discordId } });
    }),

  getByEmail: publicProcedure
    .input(
      z.object({
        email: z.string(),
      }),
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.user.findUnique({ where: { email: input.email } });
    }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.user.findMany();
  }),

  sendCoinsByUserId: publicProcedure
    .input(
      z.object({
        user: z.object({
          id: z.string(),
          username: z.string(),
          avatar: z.nullable(z.string()),
          discriminator: z.string(),
        }),
        coins: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        // TODO: Duplicated code (see packages/auth/src/auth-options.ts)
        let tempThumbnail = '';
        if (input.user.avatar === null) {
          const defaultAvatarNumber = parseInt(input.user.discriminator) % 5;
          tempThumbnail = `https://cdn.discordapp.com/embed/avatars/${defaultAvatarNumber}.png`;
        } else {
          const format = input.user.avatar.startsWith('a_') ? 'gif' : 'png';
          tempThumbnail = `https://cdn.discordapp.com/avatars/${input.user.id}/${input.user.avatar}.${format}`;
        }

        const user: User = await ctx.prisma.user.upsert({
          where: { discordId: input.user.id },
          update: { coins: { increment: input.coins } },
          create: {
            name: input.user.username,
            discordId: input.user.id,
            discordUserName: input.user.username,
            discordDiscriminator: input.user.discriminator,
            thumbnail: tempThumbnail,
            coins: input.coins,
          },
        });

        if (!user) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'USer with that ID not found',
          });
        }

        return {
          status: 'success',
          data: {
            user,
          },
        };
      } catch (err: any) {
        throw err;
      }
    }),

  sendCoinsByGithubId: publicProcedure
    .input(
      z.object({
        user: z.object({
          id: z.string(),
          login: z.string(),
          name: z.string(),
          email: z.string(),
          avatarUrl: z.string(),
        }),
        coins: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const user: User = await ctx.prisma.user.upsert({
          where: { githubId: input.user.id },
          update: { coins: { increment: parseInt(input.coins) } },
          create: {
            name: input.user.name,
            email: input.user.email,
            githubId: input.user.id,
            githubUserName: input.user.login,
            thumbnail: input.user.avatarUrl,
            coins: parseInt(input.coins),
          },
        });

        if (!user) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'User with that ID not found',
          });
        }

        return {
          status: 'success',
          data: {
            user,
          },
        };
      } catch (err: any) {
        throw err;
      }
    }),

  payCoinsByUserId: publicProcedure
    .input(
      z.object({
        receiver: z.object({
          id: z.string(),
          username: z.string(),
          avatar: z.nullable(z.string()),
          discriminator: z.string(),
        }),
        sender: z.object({
          id: z.string(),
          username: z.string(),
          avatar: z.nullable(z.string()),
          discriminator: z.string(),
        }),
        coins: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        /**
         * This function set a temp thumbnail for the user
         */
        const tempThumbnail = setTempThumbnail(input.receiver);

        /**
         * Check in the user, have a balance for the transaction
         */
        const sender = await ctx.prisma.user.findUnique({
          where: { discordId: input.sender.id },
          select: {
            coins: true,
          },
        });

        /**
         * If sender not exist, create a new user and return error tokens message
         */
        if (!sender) {
          const sender = await ctx.prisma.user.create({
            name: input.sender.username,
            discordId: input.sender.id,
            discordUserName: input.sender.username,
            discordDiscriminator: input.sender.discriminator,
            thumbnail: setTempThumbnail(input.sender),
            coins: 0,
          });

          if (sender) {
            return {
              status: 'error',
              message: 'You have no Indie Tokens for this transaction',
            };
          } else {
            return {
              status: 'error',
              message: '500 Server error',
            };
          }
        }

        /**
         * If sender, don't have coins, not aprove the transaction else,
         * transfers coins to reciver and decrement amount in wallet sender
         */
        if (sender.coins <= 0) {
          return {
            status: 'error',
            message: 'You have no Indie Tokens for this transaction',
          };
        } else {
          /**
           * Update coins of the sender, discount coins to pay
           */
          const updateSender = await ctx.prisma.user.update({
            where: { discordId: input.sender.id },
            data: { coins: { decrement: input.coins } },
            select: {
              coins: true,
            },
          });

          /**
           * If exist, add coins of the user receiver wallet, else
           * create user wallet and add coins
           */
          const updateReceiver: User = await ctx.prisma.user.upsert({
            where: { discordId: input.receiver.id },
            update: { coins: { increment: input.coins } },
            create: {
              name: input.receiver.username,
              discordId: input.receiver.id,
              discordUserName: input.receiver.username,
              discordDiscriminator: input.receiver.discriminator,
              thumbnail: tempThumbnail,
              coins: input.coins,
            },
          });

          if (!updateReceiver) {
            throw new TRPCError({
              code: 'NOT_FOUND',
              message: 'User with that ID not found',
            });
          }

          return {
            status: 'success',
            data: {
              receiver: updateReceiver,
              sender: updateSender,
            },
          };
        }
      } catch (err: any) {
        throw err;
      }
    }),

  getSecretMessage: protectedProcedure.query(() => {
    return 'you can now see this secret message!';
  }),
});
