import type { NextApiRequest, NextApiResponse } from 'next';
import { type IssueEventResponse } from '~/common';

type Override<T1, T2> = Omit<T1, keyof T2> & T2;

type GithubEventRequest = Override<NextApiRequest, { body: IssueEventResponse }>;

export default async function handler(req: GithubEventRequest, res: NextApiResponse) {
  try {
    const input = JSON.stringify({
      '0': {
        json: {
          author: {
            name: req.body.issue.user.login,
            icon_url: req.body.issue.user.avatar_url,
            url: req.body.issue.user.html_url,
          },
          content: req.body.issue.body,
          prUrl: req.body.issue.url,
          title: req.body.issue.title,
          webhookDiscordUrl: process.env.DISCORD_WEBHOOK_URL ?? '',
          coins: '2000',
        },
      },
    });
    const data = await fetch(`${process.env.API_URL}/api/trpc/test.sendDiscordMsg?batch=1`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: input,
    });
    console.log(data);
    res.status(200).json({ name: 'John Doe' });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
}
