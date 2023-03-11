import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import { SlashCommand } from '../types';
import { api } from '../api';

// NOTE: This is an example of a simple test slash command.
const command: SlashCommand = {
  command: new SlashCommandBuilder().setName('ping').setDescription("Shows the bot's ping"),
  execute: async (interaction) => {
    const hello = await (api as any).example.hello.query({ text: 'TEST' });
    console.log('hello: ', hello);
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
