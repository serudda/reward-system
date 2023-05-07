import { z, type TypeOf } from 'zod';

/*------------------------------------*/

export const sendDiscordMsgInput = z.object({
  username: z.string(),
  prUrl: z.string(),
  coins: z.string(),
  webhookDiscordUrl: z.string(),
});
export type SendDiscordMsgInputType = TypeOf<typeof sendDiscordMsgInput>;

/*------------------------------------*/

export const sendDiscordGitHubMsgInput = z.object({
  data: z.object({
    color: z.string(),
    title: z.string(),
    url: z.string(),
    content: z.string(),
    author: z.object({
      name: z.string(),
      icon_url: z.string(),
      url: z.string(),
    }),
  }),
  webhookDiscordUrl: z.string(),
});
export type SendDiscordGitHubMsgInputType = TypeOf<typeof sendDiscordGitHubMsgInput>;

/*------------------------------------*/
