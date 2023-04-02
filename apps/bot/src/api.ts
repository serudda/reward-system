import { createTRPCProxyClient, httpBatchLink, loggerLink } from '@trpc/client';
import superjson from 'superjson';
import { type AppRouter } from '@acme/api';

// const getBaseUrl = () => {
//   if (typeof window !== 'undefined') return ''; // browser should use relative url
//   if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`; // SSR should use vercel url
//   return `http://localhost:${process.env.PORT ?? 3000}`; // dev SSR should use localhost
// };

export const api = createTRPCProxyClient<AppRouter>({
  /**
   * Transformer used for data de-serialization from the server.
   *
   * @see https://trpc.io/docs/data-transformers
   */
  transformer: superjson,

  /**
   * Links used to determine request flow from client to server.
   *
   * @see https://trpc.io/docs/links
   */
  links: [
    loggerLink({
      enabled: (opts) =>
        process.env.NODE_ENV === 'development' || (opts.direction === 'down' && opts.result instanceof Error),
    }),
    httpBatchLink({
      url: `https://reward-system-nextjs-git-feature-rs-182-b-6594eb-serudda-s-team.vercel.app/api/trpc`,
    }),
  ],
});
