import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import { appRouter } from '../../../main/src/server/api/root';

// Importing the router type from the server file

// Initializing the tRPC client
const client = createTRPCProxyClient<typeof appRouter>({
  links: [
    httpBatchLink({
      url: 'http://localhost:3005/api/trpc',
    }),
  ],
});
export default client;
