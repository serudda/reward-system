import { z, type TypeOf } from 'zod';

/*------------------------------------*/

export const getUserInput = z.object({
  id: z.string(),
});
export type GetUserInputType = TypeOf<typeof getUserInput>;

/*------------------------------------*/

export const getUserByDiscordIdInput = z.object({
  discordId: z.string(),
});
export type GetUserByDiscordIdInputType = TypeOf<typeof getUserByDiscordIdInput>;

/*------------------------------------*/

export const getUserByProviderInput = z.object({
  providerAccountId: z.string(),
  provider: z.string(),
});
export type GetUserByProviderInputType = TypeOf<typeof getUserByProviderInput>;

/*------------------------------------*/

export const getUserByEmailInput = z.object({
  email: z.string(),
});
export type GetUserByEmailInputType = TypeOf<typeof getUserByEmailInput>;

/*------------------------------------*/

export const createUserInput = z.object({
  name: z.string(),
  email: z.string().optional(),
  image: z.string().default(''),
  coins: z.number().positive().default(0).optional(),
});
export type CreateUserInputType = TypeOf<typeof createUserInput>;

/*------------------------------------*/

export const sendCoinsByUserIdInput = z.object({
  user: z.object({
    id: z.string(),
    username: z.string(),
    avatar: z.nullable(z.string()),
    discriminator: z.string(),
  }),
  coins: z.number(),
});
export type SendCoinsByUserIdInputType = TypeOf<typeof sendCoinsByUserIdInput>;

/*------------------------------------*/

export const sendCoinsByGithubIdInput = z.object({
  user: z.object({
    id: z.string(),
    login: z.string(),
    name: z.string(),
    email: z.string(),
    avatarUrl: z.string(),
  }),
  coins: z.string(),
});
export type SendCoinsByGithubIdInputType = TypeOf<typeof sendCoinsByGithubIdInput>;

/*------------------------------------*/

export const payCoinsByUserIdInput = z.object({
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
});
export type PayCoinsByUserIdInputType = TypeOf<typeof payCoinsByUserIdInput>;

/*------------------------------------*/
