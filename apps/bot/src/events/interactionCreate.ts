import { type Interaction } from 'discord.js';

import { type BotEvent } from '../types';

/*
This is an event handler for a Discord bot that handles slash commands and autocomplete interactions.It includes a cooldown system to limit the rate at which users can execute certain commands.The code retrieves the corresponding command object and checks whether it has a cooldown or an autocomplete function, depending on the type of interaction.It then executes the command or calls the autocomplete function, respectively. */
const event: BotEvent = {
  name: 'interactionCreate',
  execute: (interaction: Interaction) => {
    if (interaction.isChatInputCommand()) {
      const command = interaction.client.slashCommands.get(interaction.commandName);
      const cooldown = interaction.client.cooldowns.get(`${interaction.commandName}-${interaction.user.username}`);
      if (!command) return;
      if (command.cooldown && cooldown) {
        if (Date.now() < cooldown) {
          void interaction.reply(
            `You have to wait ${Math.floor(
              Math.abs(Date.now() - cooldown) / 1000,
            )} second(s) to use this command again.`,
          );
          setTimeout(() => void interaction.deleteReply(), 5000);
          return;
        }
        interaction.client.cooldowns.set(
          `${interaction.commandName}-${interaction.user.username}`,
          Date.now() + command.cooldown * 1000,
        );
        setTimeout(() => {
          interaction.client.cooldowns.delete(`${interaction.commandName}-${interaction.user.username}`);
        }, command.cooldown * 1000);
      } else if (command.cooldown && !cooldown) {
        interaction.client.cooldowns.set(
          `${interaction.commandName}-${interaction.user.username}`,
          Date.now() + command.cooldown * 1000,
        );
      }
      command.execute(interaction);
    } else if (interaction.isAutocomplete()) {
      const command = interaction.client.slashCommands.get(interaction.commandName);
      if (!command) {
        console.error(`No command matching ${interaction.commandName} was found.`);
        return;
      }
      try {
        if (!command.autocomplete) return;
        command.autocomplete(interaction);
      } catch (error) {
        console.error(error);
      }
    }
  },
};

export default event;
