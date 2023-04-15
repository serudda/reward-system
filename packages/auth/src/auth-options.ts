import { PrismaAdapter } from '@next-auth/prisma-adapter';
import type { DefaultSession, NextAuthOptions } from 'next-auth';
import DiscordProvider, { type DiscordProfile } from 'next-auth/providers/discord';
import GithubProvider, { type GithubProfile } from 'next-auth/providers/github';
import { prisma } from '@acme/db';
import {
  createAccountHandler,
  createUserHandler,
  getAccountByProviderHandler,
  getAccountByUserAndProviderHandler,
  getUserByEmailHandler,
  updateAccountHandler,
  updateProviderUsernameAccountHandler,
} from './utils/api';

/**
 * Module augmentation for `next-auth` types
 * Allows us to add custom properties to the `session` object
 * and keep type safety
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 **/
declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string;
      image: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession['user'];
  }

  interface User {
    id: string;
    name: string;
    email: string;
    image: string;
  }
}

/**
 * Options for NextAuth.js used to configure
 * adapters, providers, callbacks, etc.
 * @see https://next-auth.js.org/configuration/options
 **/
export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    DiscordProvider<DiscordProfile>({
      clientId: process.env.DISCORD_CLIENT_ID as string,
      clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
    }),
    GithubProvider<GithubProfile>({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
    /**
     * ...add more providers here
     *
     * Most other providers require a bit more work than the Discord provider.
     * For example, the GitHub provider requires you to add the
     * `refresh_token_expires_in` field to the Account model. Refer to the
     * NextAuth.js docs for the provider you want to use. Example:
     * @see https://next-auth.js.org/providers/github
     **/
  ],
  callbacks: {
    /**
     * The callback -> signIn() is a function to next-auth
     * that permits you to customize the sign in process.
     */
    async signIn({ account, profile, user: newUser }): Promise<boolean | string> {
      /**
       * The Discord provider flow
       */
      if (account?.provider === 'discord') {
        const { username, image_url, email } = profile as DiscordProfile;
        const { provider, providerAccountId } = account;
        const { name } = newUser;

        // Find the user by email
        const user = await getUserByEmailHandler(email);

        // If the user already exists, update their account, otherwise create a new user
        if (user) {
          const userAccount = await getAccountByUserAndProviderHandler(user.id, providerAccountId, provider);

          /**
           * If the user already has an account with the same provider and providerAccountId,
           * update the account. Otherwise, create a new account for the user.
           */
          if (userAccount) await updateAccountHandler(userAccount.id, username, account);
          else await createAccountHandler(user.id, username, account);
        } else await createUserHandler(name, username, email, image_url, account);
      }

      /**
       * The Github provider flow
       */
      if (account?.provider === 'github') {
        const { login, email } = profile as GithubProfile;
        const { provider, providerAccountId } = account;

        if (login) {
          // Check if the account already exists
          const existingAccount = await getAccountByProviderHandler(providerAccountId, provider);
          if (existingAccount) await updateProviderUsernameAccountHandler(existingAccount.id, login);
          else {
            // Find the user by email
            const user = await getUserByEmailHandler(email as string);

            // If the user already exists, create a new account for them, otherwise return an error
            if (user) await createAccountHandler(user.id, login, account);
            else return '/auth/error?error=UserNotFound';
          }
        }
      }

      /**
       * NOTE: Remember that by returning true, you are telling next-auth to continue the authentication process.
       * the authentication process, i.e., it will create and update again all the tables involved in the authentication process (User, Account, Session, etc.).
       * tables that are involved in the authentication process (User, Account, Session, etc.).
       * Here we should only update the fields that next-auth does not update by default (such as username).
       */
      return true;
    },

    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
        session.user.name = user.name;
        session.user.email = user.email;
        session.user.image = user.image;
        // session.user.role = user.role; <-- put other properties on the session here
      }
      return session;
    },
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
};
