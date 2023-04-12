import { PrismaAdapter } from '@next-auth/prisma-adapter';
import type { DefaultSession, NextAuthOptions } from 'next-auth';
import DiscordProvider, { type DiscordProfile } from 'next-auth/providers/discord';
import GithubProvider, { type GithubProfile } from 'next-auth/providers/github';
import { prisma } from '@acme/db';

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
    async signIn({ account, profile, user: newUser }): Promise<boolean> {
      if (account?.provider === 'discord') {
        const { username, image_url, email } = profile as DiscordProfile;
        const {
          provider,
          type,
          providerAccountId,
          access_token,
          expires_at,
          refresh_token,
          scope,
          token_type,
          id_token,
          session_state,
        } = account;
        const { name } = newUser;

        // Find the user by their providerAccountId and provider
        const user = await prisma.user.findFirst({
          where: {
            accounts: {
              some: {
                providerAccountId,
                provider,
              },
            },
          },
          select: {
            id: true,
          },
        });

        // If the user already exists, update their account, otherwise create a new user
        if (user) {
          const userAccount = await prisma.account.findFirst({
            where: {
              userId: user.id,
              providerAccountId,
              provider,
            },
            select: {
              id: true,
            },
          });

          /**
           * If the user already has an account with the same provider and providerAccountId,
           * update the account. Otherwise, create a new account for the user.
           */
          if (userAccount) {
            await prisma.account.update({
              where: {
                id: userAccount.id,
              },
              data: {
                type,
                providerUsername: username,
                refresh_token,
                access_token,
                expires_at,
                token_type,
                scope,
                id_token,
                session_state,
              },
            });
          } else {
            await prisma.account.create({
              data: {
                type,
                provider,
                providerAccountId,
                providerUsername: username,
                refresh_token,
                access_token,
                expires_at,
                token_type,
                scope,
                id_token,
                session_state,
                user: {
                  connect: {
                    id: user.id,
                  },
                },
              },
            });
          }
        } else {
          await prisma.user.create({
            data: {
              name,
              email,
              image: image_url,
              accounts: {
                create: {
                  type,
                  provider,
                  providerAccountId,
                  providerUsername: username,
                  refresh_token,
                  access_token,
                  expires_at,
                  token_type,
                  scope,
                  id_token,
                  session_state,
                },
              },
            },
          });
        }
      }

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
};
