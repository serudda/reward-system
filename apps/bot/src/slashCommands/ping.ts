import { EmbedBuilder, SlashCommandBuilder } from 'discord.js';

import { api } from '../api';
import { SlashCommand } from '../types';

// NOTE: This is an example of a simple test slash command.
const command: SlashCommand = {
  command: new SlashCommandBuilder().setName('ping').setDescription("Shows the bot's ping"),
  execute: async (interaction) => {
    const user = await api.user.getByEmail.query({
      email: 'serudda.oficial@gmail.com',
    });
    console.log('user: ', user);
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
