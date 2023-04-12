import { Prisma, type User } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import i18n from '@acme/i18n';
import { PrismaErrorCode, Response, TRPCErrorCode } from '../constants';
import { createTRPCRouter, publicProcedure } from '../trpc';
import { setThumbnailUrl } from '../utils/functions';

export const userRouter = createTRPCRouter({
  getById: publicProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.user.findUnique({ where: { id: input.id } });
    }),

  getByDiscordId: publicProcedure
    .input(
      z.object({
        discordId: z.string(),
      }),
    )
    .query(({ ctx, input }) => {
      // TODO: remove when everything works fine
      // return ctx.prisma.user.findUnique({ where: { discordId: input.discordId } });
      return ctx.prisma.user.findFirst({
        where: {
          accounts: {
            some: {
              providerAccountId: input.discordId,
              provider: 'discord',
            },
          },
        },
        include: {
          accounts: true,
        },
      });
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

  create: publicProcedure
    .input(
      z.object({
        name: z.string(),
        email: z.string().optional(),
        image: z.string().default(''),
        coins: z.number().positive().default(0).optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        // TODO: Clean this when this section is tested
        // const user = await ctx.prisma.user.create({
        //   data: { ...input },
        // });

        const user = await ctx.prisma.user.create({
          data: {
            name: input.name,
            image: input.image,
            coins: input.coins,
            email: input.email,
          },
        });

        return {
          status: Response.SUCCESS,
          data: {
            user,
          },
        };
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

        // TODO: Clean this when this section is tested
        // const user: User = await ctx.prisma.user.upsert({
        //   where: { discordId: input.user.id },
        //   update: { coins: { increment: input.coins } },
        //   create: {
        //     name: input.user.username,
        //     discordId: input.user.id,
        //     discordUserName: input.user.username,
        //     image: tempThumbnail,
        //     coins: input.coins,
        //   },
        // });

        // Search for existing user
        const existingUser = await ctx.prisma.user.findFirst({
          where: {
            accounts: {
              some: {
                providerAccountId: input.user.id,
                provider: 'discord',
              },
            },
          },
          include: {
            accounts: true,
          },
        });

        let user: User;

        // If user exist, update it
        if (existingUser) {
          user = await ctx.prisma.user.update({
            where: {
              id: existingUser.id,
            },
            data: {
              coins: { increment: input.coins },
            },
            include: {
              accounts: true,
            },
          });
        } else {
          // If user doesn't exist, create it
          user = await ctx.prisma.user.create({
            data: {
              name: input.user.username,
              image: tempThumbnail,
              coins: input.coins,
              accounts: {
                create: {
                  provider: 'discord',
                  providerAccountId: input.user.id,
                  providerUserName: input.user.username,
                  type: 'oauth',
                },
              },
            },
            include: {
              accounts: true,
            },
          });
        }

        // Check if user exist
        if (!user) {
          const message = i18n.t('common.message.error.userNotFound');
          throw new TRPCError({
            code: TRPCErrorCode.INTERNAL_SERVER_ERROR,
            message,
          });
        }

        return {
          status: Response.SUCCESS,
          data: {
            user,
          },
        };
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
        // TODO: Clean this when this section is tested
        // const user: User = await ctx.prisma.user.upsert({
        //   where: {
        //      githubId: input.user.id
        //     },
        //   update: { coins: { increment: parseInt(input.coins) } },
        //   create: {
        //     name: input.user.name,
        //     email: input.user.email,
        //     githubId: input.user.id,
        //     githubUserName: input.user.login,
        //     thumbnail: input.user.avatarUrl,
        //     coins: parseInt(input.coins),
        //   },
        // });

        // Search for existing user
        const existingUser = await ctx.prisma.user.findFirst({
          where: {
            accounts: {
              some: {
                providerAccountId: input.user.id,
                provider: 'github',
              },
            },
          },
          include: {
            accounts: true,
          },
        });

        let user: User;
        if (existingUser) {
          user = await ctx.prisma.user.update({
            where: {
              id: existingUser.id,
            },
            data: {
              coins: { increment: parseInt(input.coins) },
            },
            include: {
              accounts: true,
            },
          });
        } else {
          user = await ctx.prisma.user.create({
            data: {
              name: input.user.name,
              email: input.user.email,
              image: input.user.avatarUrl,
              coins: parseInt(input.coins),
              accounts: {
                create: {
                  provider: 'github',
                  providerAccountId: input.user.id,
                  providerUserName: input.user.login,
                  type: 'oauth',
                },
              },
            },
            include: {
              accounts: true,
            },
          });
        }

        if (!user) {
          const message = i18n.t('common.message.error.userNotFound');
          throw new TRPCError({
            code: TRPCErrorCode.INTERNAL_SERVER_ERROR,
            message,
          });
        }

        return {
          status: Response.SUCCESS,
          data: {
            user,
          },
        };
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
        //Check if the sender user has enough balance for the transaction

        // TODO: Clean this when this section is tested
        // const senderBalance = await ctx.prisma.user.findUnique({
        //   where: { discordId: input.sender.id },
        //   select: {
        //     coins: true,
        //   },
        // });

        const senderBalance = await ctx.prisma.user.findFirst({
          where: {
            accounts: {
              some: {
                providerAccountId: input.sender.id,
                provider: 'discord',
              },
            },
          },
          select: {
            id: true,
            coins: true,
          },
        });

        // If senderBalance is null, it means that the user doesn't exist in the database. Create the sender user.
        if (!senderBalance) {
          // const newUser: User = await ctx.prisma.user.create({
          //   data: {
          //     name: input.sender.username,
          //     discordId: input.sender.id,
          //     discordUserName: input.sender.username,
          //     discordDiscriminator: input.sender.discriminator,
          //     thumbnail: setThumbnailUrl(input.sender),
          //     coins: 0,
          //   },
          // });

          const newUser = await ctx.prisma.user.create({
            data: {
              name: input.sender.username,
              image: setThumbnailUrl(input.sender),
              coins: 0,
              accounts: {
                create: {
                  provider: 'discord',
                  providerAccountId: input.sender.id,
                  providerUserName: input.sender.username,
                  type: 'oauth',
                },
              },
            },
            include: {
              accounts: true,
            },
          });

          // After created the user, notify the user that he doesn't have enough balance
          const message = newUser
            ? i18n.t('package.api.user.payCoinsByUserId.error.insufficientBalance')
            : i18n.t('common.message.error.internalError');
          throw new TRPCError({
            code: TRPCErrorCode.INTERNAL_SERVER_ERROR,
            message,
          });
        }

        // If sender doesn't have coins, reject the transaction.
        if (senderBalance.coins <= 0 || senderBalance.coins < input.coins) {
          const message = i18n.t('package.api.user.payCoinsByUserId.error.insufficientBalance');
          throw new TRPCError({
            code: TRPCErrorCode.INTERNAL_SERVER_ERROR,
            message,
          });
        }

        // Decrement sender's coins to make the transaction
        // TODO: Clean this when this section is tested
        // const newSenderBalance = await ctx.prisma.user.update({
        //   where: { discordId: input.sender.id },
        //   data: { coins: { decrement: input.coins } },
        //   select: {
        //     coins: true,
        //   },
        // });

        const newSenderBalance = await ctx.prisma.user.update({
          where: { id: senderBalance.id },
          data: { coins: { decrement: input.coins } },
          select: {
            coins: true,
          },
        });

        if (!newSenderBalance) {
          const message = i18n.t('common.message.error.internalError');
          throw new TRPCError({
            code: TRPCErrorCode.INTERNAL_SERVER_ERROR,
            message,
          });
        }

        // This function set a temp thumbnail for the user
        const tempThumbnail = setThumbnailUrl(input.receiver);

        /**
         *  If the receiver doesn't exists, create him/her in the DB.
         * Otherwise, Increment the receiver's coins.
         */

        // TODO: Clean this when this section is tested
        // const updatedReceiver: User = await ctx.prisma.user.upsert({
        //   where: { discordId: input.receiver.id },
        //   update: { coins: { increment: input.coins } },
        //   create: {
        //     name: input.receiver.username,
        //     discordId: input.receiver.id,
        //     discordUserName: input.receiver.username,
        //     discordDiscriminator: input.receiver.discriminator,
        //     thumbnail: tempThumbnail,
        //     coins: input.coins,
        //   },
        // });

        // Search for existing user
        const existingReceiver = await ctx.prisma.user.findFirst({
          where: {
            accounts: {
              some: {
                providerAccountId: input.receiver.id,
                provider: 'discord',
              },
            },
          },
          include: {
            accounts: true,
          },
        });

        let receiver: User;
        if (existingReceiver) {
          receiver = await ctx.prisma.user.update({
            where: {
              id: existingReceiver.id,
            },
            data: {
              coins: { increment: input.coins },
            },
            include: {
              accounts: true,
            },
          });
        } else {
          receiver = await ctx.prisma.user.create({
            data: {
              name: input.receiver.username,
              image: tempThumbnail,
              coins: input.coins,
              accounts: {
                create: {
                  provider: 'discord',
                  providerAccountId: input.receiver.id,
                  providerUserName: input.receiver.username,
                  type: 'oauth',
                },
              },
            },
            include: {
              accounts: true,
            },
          });
        }

        if (!receiver) {
          const message = i18n.t('package.api.user.payCoinsByUserId.error.userUpdateNotFound');
          throw new TRPCError({
            code: TRPCErrorCode.INTERNAL_SERVER_ERROR,
            message,
          });
        }

        return {
          status: Response.SUCCESS,
          data: {
            receiver,
          },
        };
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
    }),
});
