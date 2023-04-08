import type { NextApiRequest, NextApiResponse } from 'next';
import { IssueActions, IssueColors, type IssueEventResponse } from '~/common';

type Override<T1, T2> = Omit<T1, keyof T2> & T2;

type GithubEventRequest = Override<NextApiRequest, { body: IssueEventResponse }>;
/**
 * Handles GitHub events and sends a message to a Discord channel.
 * @param {GithubEventRequest} req - The GitHub event request.
 * @param {NextApiResponse} res - The API response.
 */
export default async function handler(req: GithubEventRequest, res: NextApiResponse) {
  try {
    const { issue, action, repository } = req.body;
    if (action === IssueActions.opened || action === IssueActions.closed) {
      const color: string = IssueColors[action];
      const input = JSON.stringify({
        '0': {
          json: {
            color,
            title: `[${repository.name}] Issue ${action}: #${issue.number} ${issue.title}`,
            content: issue.body,
            url: issue.url,
            webhookDiscordUrl: process.env.DISCORD_WEBHOOK_URL ?? '',
            author: {
              name: issue.user.login,
              icon_url: issue.user.avatar_url,
              url: issue.user.html_url,
            },
            // TODO: get Indies Tokens property
            // coins: '2000',
          },
        },
      });
      await fetch(`${process.env.API_URL}/api/trpc/bot.sendIssueMsg?batch=1`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: input,
      });
      res.status(200).json({ message: 'Message sent to Discord channel' });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
}
