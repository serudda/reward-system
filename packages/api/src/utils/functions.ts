import { TRPCError } from '@trpc/server';
import i18n from '@acme/i18n';
import { TRPCErrorCode } from '../constants';
import { type DiscordMsg } from '../types/discordMsg';

interface User {
  avatar: string | null;
  discriminator: string;
  id: string;
}

/**
 * setThumbnailUrl return url to discord user image, for expose in the command return.
 * @param user
 * @returns
 */

export const setThumbnailUrl = (user: User): string => {
  if (user.avatar === null) {
    const defaultAvatarNumber = parseInt(user.discriminator) % 5;
    return `https://cdn.discordapp.com/embed/avatars/${defaultAvatarNumber}.png`;
  } else {
    const format = user.avatar.startsWith('a_') ? 'gif' : 'png';
    return `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.${format}`;
  }
};

/**
 * Sends a message to Discord using a webhook.
 * @param {string} webhookDiscordUrl - The Discord webhook URL.
 * @param {DiscordMsg} data - The Discord message object.
 * @throws {TRPCError} If the webhook URL is not found.
 */
export const sendDiscordMsg = async (webhookDiscordUrl: string, data: DiscordMsg): Promise<void | TRPCError> => {
  if (!webhookDiscordUrl) {
    const message = i18n.t('package.api.bot.sendDiscordMsg.error.webhookNotFound', {
      url: webhookDiscordUrl,
    });

    throw new TRPCError({
      code: TRPCErrorCode.NOT_FOUND,
      message,
    });
  }

  await fetch(webhookDiscordUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
    .then(() => console.log(i18n.t('package.api.bot.sendDiscordMsg.success')))
    .catch((error) => console.error(i18n.t('package.api.bot.sendDiscordMsg.error.internalError'), error));
};
