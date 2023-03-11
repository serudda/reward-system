import { createNextApiHandler } from '@trpc/server/adapters/next';
import { appRouter } from '../../../server/api/root';
import { createTRPCContext } from '../../../server/api/trpc';

// Handle incoming tRPC requests
export default createNextApiHandler({
  router: appRouter,
  createContext: createTRPCContext,
});
