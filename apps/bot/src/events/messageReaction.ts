import {
  type MessageReaction,
  type PartialMessageReaction,
  type PartialUser,
  type PermissionResolvable,
  type User,
} from 'discord.js';
import { i18n } from '@acme/i18n';
import { api } from '../api';
import { config } from '../common/constants';
import { type BotEvent } from '../types';

/**
  This is an event handler that listens for a message event.
  It checks if someone reacts to a message with an specific emoji.
  If the user has the role Admin, and his/her has reacted to a message with the emoji,
  it adds X Indie Tokens to the message author's wallet.
*/
const event: BotEvent = {
  name: 'messageReactionAdd',
  execute: async (reaction: MessageReaction | PartialMessageReaction, user: User | PartialUser) => {
    // When a reaction is received, check if the structure is partial
    if (reaction.partial) {
      // If the teaction is partial, fetch the full message
      try {
        await reaction.fetch();
        await user.fetch();
      } catch (error) {
        console.error(i18n.t('common.message.error.internalError'), error);
        // Return as `reaction.message.author` may be undefined/null
        return;
      }
    }

    // Check if the emoji is the one we want
    if (reaction.emoji.id !== config.reactionEmojiId) return;

    // Get the user who reacted
    if (reaction.message.guild === null) return;
    const member = await reaction.message.guild.members.fetch(user.id);
    if (!member) return;

    // Check if the user has the role Admin
    if (!member.permissions.has(config.roleAdminId as PermissionResolvable)) return;

    // Update or Create User
    await api.user.sendCoinsByUserId.mutate({
      user: reaction.message.author as User,
      coins: config.reactionCoins,
    });

    const message = i18n.t('app.bot.messageReaction.success', {
      userId: user.id,
      coins: config.reactionCoins,
      author: reaction.message.author,
      url: reaction.message.url,
    });

    // Send a message to the Discord channel
    void reaction.message.channel.send(message);
  },
};

export default event;
