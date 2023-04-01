import { type MessageReaction, type PartialMessageReaction, type PartialUser, type User } from 'discord.js';
import { api } from '../api';
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
        console.error('Something went wrong when fetching the message:', error);
        // Return as `reaction.message.author` may be undefined/null
        return;
      }
    }

    // Check if the emoji is the one we want // TODO: Move this ID to a config file
    if (reaction.emoji.id !== '1079571995160744007') return;

    // Get the user who reacted
    if (reaction.message.guild === null) return;
    const member = await reaction.message.guild.members.fetch(user.id);
    if (!member) return;

    // Check if the user has the role Admin // TODO: Move this ID to a config file
    if (!member.permissions.has('972596676227366972')) return;

    // Update or Create User
    await api.user.sendCoinsByUserId.mutate({
      user: reaction.message.author as User,
      coins: 200, // TODO: Move this number to a config file
    });

    // Send a message to the Discord channel
    void reaction.message.channel.send(
      `
    :mega:
  ---------------
  **${user.username}** has added 200 Indie Tokens :gem: to ${reaction.message.author}'s wallet
  → For sharing the following valuable message:
    ${reaction.message.url}
  ---------------
              `,
    );
  },
};

export default event;
