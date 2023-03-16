import { ChannelType, type Message } from 'discord.js';

import { checkPermissions, sendTimedMessage } from '../functions';
import { type BotEvent } from '../types';

/*
This  is an event handler that listens for a message event. It checks if the message was sent by a bot or not in a guild channel.If it starts with the bot's prefix, it searches for a command to execute and checks the user's permissions.If the command has a cooldown, it sets a timer and stores the cooldown information for future use.Finally, it executes the command with the given arguments. */
const event: BotEvent = {
  name: 'messageCreate',
  execute: (message: Message) => {
    if (!message.member || message.member.user.bot) return;
    if (!message.guild) return;
    const prefix = process.env.PREFIX;

    if (!message.content.startsWith(prefix)) return;
    if (message.channel.type !== ChannelType.GuildText) return;

    const args = message.content.substring(prefix.length).split(' ');
    let command = message.client.commands.get(args[0] as string);

    if (!command) {
      const commandFromAlias = message.client.commands.find((command) => command.aliases.includes(args[0] as string));
      if (commandFromAlias) command = commandFromAlias;
      else return;
    }

    const cooldown = message.client.cooldowns.get(`${command.name}-${message.member.user.username}`);
    const neededPermissions = checkPermissions(message.member, command.permissions);
    if (neededPermissions !== null)
      return sendTimedMessage(
        `
            You don't have enough permissions to use this command.
            \n Needed permissions: ${neededPermissions.join(', ')}
            `,
        message.channel,
        5000,
      );

    if (command.cooldown && cooldown) {
      if (Date.now() < cooldown) {
        sendTimedMessage(
          `You have to wait ${Math.floor(Math.abs(Date.now() - cooldown) / 1000)} second(s) to use this command again.`,
          message.channel,
          5000,
        );
        return;
      }
      message.client.cooldowns.set(
        `${command.name}-${message.member.user.username}`,
        Date.now() + command.cooldown * 1000,
      );
      setTimeout(() => {
        message.client.cooldowns.delete(`${command?.name}-${message.member?.user.username}`);
      }, command.cooldown * 1000);
    } else if (command.cooldown && !cooldown) {
      message.client.cooldowns.set(
        `${command.name}-${message.member.user.username}`,
        Date.now() + command.cooldown * 1000,
      );
    }

    command.execute(message, args);
  },
};

export default event;
