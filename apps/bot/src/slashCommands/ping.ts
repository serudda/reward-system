import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import { SlashCommand } from '../types';

// NOTE: This is an example of a simple test slash command.
const command: SlashCommand = {
  command: new SlashCommandBuilder().setName('ping').setDescription("Shows the bot's ping"),
  execute: (interaction) => {
    interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setAuthor({ name: 'MRC License' })
          .setDescription(`🏓 Pong! \n 📡 Ping: ${interaction.client.ws.ping}`),
      ],
    });
  },
  cooldown: 10,
};

export default command;
