import { TypeOf, z } from 'zod';

/*------------------------------------*/

export const sendDiscordMsgInput = z.object({
  username: z.string(),
  prUrl: z.string(),
  coins: z.string(),
  webhookDiscordUrl: z.string(),
});
export type SendDiscordMsgInputType = TypeOf<typeof sendDiscordMsgInput>;

/*------------------------------------*/
