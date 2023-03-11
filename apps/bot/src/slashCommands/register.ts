import fetch from 'cross-fetch';
import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

import { SlashCommand } from '../types';

// NOTE: This is an example of a simple test slash command.
const command: SlashCommand = {
  command: new SlashCommandBuilder()
    .setName('register')
    .setDescription('register your user')
    .addStringOption((option) => {
      return option.setName('github').setDescription('Your GitHub username').setRequired(true);
    }),
  execute: async (interaction) => {
    try {
      await interaction.deferReply({ ephemeral: true });
      const options: any = {};
      if (!interaction.options) return interaction.editReply({ content: 'Github is empty...' });
      for (let i = 0; i < interaction.options.data.length; i++) {
        const element: any = interaction.options.data[i];
        if (element.name && element.value) options[element.name] = element.value;
      }
      console.log(interaction.options);
      const user = await fetch('http://localhost:3005/api/user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          discord: interaction.user.username,
          github: options.github,
        }),
      });
      const response = await user.json();
      console.log(user);
      if (!user.ok) {
        interaction.editReply({
          embeds: [
            new EmbedBuilder().setAuthor({ name: 'User Error 💀💀💀' }).setDescription(`❌${response.message}❌`),
          ],
        });
        return;
      }

      interaction.editReply({
        embeds: [
          new EmbedBuilder()
            .setAuthor({ name: 'User Response' })
            .setDescription(`Discord User: ${interaction.user.username} \n GitHub User: ${options.github}`),
        ],
      });
    } catch (error) {
      console.log(error);
      interaction.editReply({ content: 'Something went wrong...' });
    }
  },
  cooldown: 10,
};

export default command;
