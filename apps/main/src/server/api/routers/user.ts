import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '@/server/api/trpc';
import { getHTTPStatusCodeFromError } from '@trpc/server/http';
import { TRPCError } from '@trpc/server';

export const userRouter = createTRPCRouter({
  /*  getAll: publicProcedure
    .meta({
      openapi: {
        method: 'GET',
        path: '/users',
        tags: ['users'],
        summary: 'Test user query',
      },
    })
    .query(({ ctx }) => {
      return ctx.prisma.example.findMany();
    }), */

  createUser: publicProcedure
    .meta({
      openapi: {
        method: 'POST',
        path: '/user',
        summary: 'Test user mutation',
      },
    })
    .input(z.object({ github: z.string(), discord: z.string() }))
    .output(
      z
        .object({
          id: z.string(),
          createdAt: z.date(),
          updatedAt: z.date(),
          github: z.string(),
          discord: z.string(),
        })
        .or(z.undefined())
        .or(z.number()),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const request = await fetch(`https://api.github.com/users/${input.github}`);

        if (request.status === 404) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'Invalid Github User, please try again later.',
          });
        }
        return ctx.prisma.example.create({
          data: {
            github: input.github,
            discord: input.discord,
          },
        });
      } catch (err) {
        console.log(err);
        if (err instanceof TRPCError) {
          // ✅ TypeScript knows err is Error
          console.log(err.message);
          throw new TRPCError({
            code: err.code,
            message: err.message,
          });
        } else {
          console.log('Unexpected error', err);
          throw new TRPCError({
            code: 'BAD_REQUEST',
          });
        }
      }
    }),
});
