import { SlashCommandBuilder, type CacheType, type CommandInteraction, type User as UserDiscord } from 'discord.js';

import { api } from '../api';
import translate from '../i18n/en.json';
import { type SlashCommand } from '../types';

const showSentCoinsMsg = (interaction: CommandInteraction<CacheType>, coins: string) => {
  const receiver = interaction.options.getUser('user');
  void interaction.reply(`${interaction.user} gives ${coins} Indie Tokens to ${receiver}.`);
};

/** Main command */
const command: SlashCommand = {
  command: new SlashCommandBuilder()
    .setName('pay')
    .setDescription(translate.commands.pay.pay)
    .addUserOption((option) => option.setName('user').setDescription(translate.commands.pay.receiver).setRequired(true))
    .addStringOption((option) =>
      option.setName('coins').setDescription(translate.commands.pay.amount).setRequired(true),
    ),
  execute: async (interaction) => {
    const user = interaction.options.getUser('user');
    // TODO: Fix an Type issue with .getString, it is not recognized as a function
    const coins: string = (interaction.options as any).getString('coins'); // eslint-disable-line @typescript-eslint/no-unsafe-assignment
    if (interaction.user === user) {
      void interaction.reply("They can't indie tokens to yourself");
    } else {
      // Update or Create User
      const updatedUser = await api.user.payCoinByUserId.mutate({
        user: user as UserDiscord,
        transmitter: interaction.user.id,
        coins: parseInt(coins),
      });

      if (updatedUser?.status === 'failed') {
        void interaction.reply(updatedUser?.message);
      }

      if (updatedUser.data) showSentCoinsMsg(interaction, coins);
    }
  },
  cooldown: 10,
};

export default command;
