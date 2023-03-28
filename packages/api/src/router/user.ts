import { type User } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import { createTRPCRouter, protectedProcedure, publicProcedure } from '../trpc';
import { setThumbnailUrl } from '../utils/functions';

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
        const tempThumbnail = setThumbnailUrl(input.user);

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
        // This function set a temp thumbnail for the user
        const tempThumbnail = setThumbnailUrl(input.receiver);

        //Check in the user, have a balance for the transaction
        const sender = await ctx.prisma.user.findUnique({
          where: { discordId: input.sender.id },
          select: {
            coins: true,
          },
        });

        //If sender not exist, create a new user and return error becaus your first balance is 0
        if (!sender) {
          const createSender: User = await ctx.prisma.user.create({
            data: {
              name: input.sender.username,
              discordId: input.sender.id,
              discordUserName: input.sender.username,
              discordDiscriminator: input.sender.discriminator,
              thumbnail: setThumbnailUrl(input.sender),
              coins: 0,
            },
          });

          if (createSender) {
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
         * If sender doesn't have coins, not aprove the transaction.
         * Otherwise, transfer the coins to the receiver and to decrement coins from  the sender's wallet
         */
        if (sender.coins <= 0 || sender.coins < input.coins) {
          return {
            status: 'error',
            message: 'You have no Indie Tokens for this transaction',
          };
        } else {
          // Decrement sender's coins to make the transaction
          const updateSender = await ctx.prisma.user.update({
            where: { discordId: input.sender.id },
            data: { coins: { decrement: input.coins } },
            select: {
              coins: true,
            },
          });

          /**
           *  If the receiver doesn't exists, create him/her in the DB.
           * Otherwise, Increment the receiver's coins.
           */

          if (updateSender) {
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
              },
            };
          } else {
            return {
              status: 'error',
              message: '500 Server error',
            };
          }
        }
      } catch (err: any) {
        throw err;
      }
    }),

  getSecretMessage: protectedProcedure.query(() => {
    return 'you can now see this secret message!';
  }),
});
