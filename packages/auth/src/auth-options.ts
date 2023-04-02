import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { type DefaultSession, type NextAuthOptions } from 'next-auth';
import DiscordProvider, { type DiscordProfile } from 'next-auth/providers/discord';
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
      // ...other properties
      // role: UserRole;
    } & DefaultSession['user'];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
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
    async signIn({ account, profile }): Promise<boolean> {
      if (account?.provider === 'discord') {
        const { id, username, discriminator, image_url, email } = profile as DiscordProfile;

        // Create the user if they don't exist or update the user if they do
        const newUser = await prisma.user.upsert({
          where: { discordId: id },
          update: {
            discordUserName: username,
            discordDiscriminator: discriminator,
            thumbnail: image_url,
            email,
          },
          create: {
            name: username,
            email: email ?? '',
            discordId: id,
            discordUserName: username,
            discordDiscriminator: discriminator,
            thumbnail: image_url,
          },
        });

        if (!newUser) return false;

        // After creating the user, we need to create/update the account
        const newAccount = await prisma.account.upsert({
          where: {
            provider_providerAccountId: {
              providerAccountId: account?.providerAccountId,
              provider: account.provider,
            },
          },
          update: {
            access_token: account.access_token,
            refresh_token: account.refresh_token,
            expires_at: account.expires_at,
            scope: account.scope,
          },
          create: {
            type: account.type,
            access_token: account.access_token,
            refresh_token: account.refresh_token,
            expires_at: account.expires_at,
            providerAccountId: id,
            provider: account.provider,
            token_type: account.token_type,
            scope: account.scope,
            id_token: account.id_token,
            session_state: account.session_state,
            userId: newUser.id,
          },
        });

        if (!newAccount) return false;
      }

      return true;
    },

    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
        // session.user.role = user.role; <-- put other properties on the session here
      }
      return session;
    },
  },
};
