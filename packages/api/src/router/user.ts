import { type User } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import { createTRPCRouter, protectedProcedure, publicProcedure } from '../trpc';

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
        coins: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        console.log('input:', input);

        const user: User = await ctx.prisma.user.upsert({
          where: { githubId: input.user.id },
          update: { coins: { increment: input.coins } },
          create: {
            name: input.user.name,
            email: input.user.email,
            githubUserName: input.user.login,
            thumbnail: input.user.avatarUrl,
            coins: input.coins,
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

  getSecretMessage: protectedProcedure.query(() => {
    return 'you can now see this secret message!';
  }),
});
