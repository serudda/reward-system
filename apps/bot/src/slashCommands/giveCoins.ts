import { SlashCommandBuilder, type CacheType, type CommandInteraction, type User as UserDiscord } from 'discord.js';

import i18n from '@acme/i18n';

import { api } from '../api';
import { type SlashCommand } from '../types';

const showSentCoinsMsg = (interaction: CommandInteraction<CacheType>, coins: string) => {
  const receiver = interaction.options.getUser('user');
  const message = i18n.t('app.bot.command.giveCoins.success.give', {
    sender: interaction.user,
    coins,
    receiver,
  });

  void interaction.reply(message);
};

/** Main command */
const command: SlashCommand = {
  command: new SlashCommandBuilder()
    .setName('give-coins')
    .setDescription(i18n.t('app.bot.command.giveCoins.give'))
    .addUserOption((option) =>
      option.setName('user').setDescription(i18n.t('app.bot.command.giveCoins.receiver')).setRequired(true),
    )
    .addStringOption((option) =>
      option.setName('coins').setDescription(i18n.t('app.bot.command.giveCoins.amount')).setRequired(true),
    ),
  execute: async (interaction) => {
    const user = interaction.options.getUser('user');
    // TODO: Fix an Type issue with .getString, it is not recognized as a function
    const coins: string = (interaction.options as any).getString('coins'); // eslint-disable-line @typescript-eslint/no-unsafe-assignment

    // Update or Create User
    const updatedUser = await api.user.sendCoinsByUserId.mutate({
      user: user as UserDiscord,
      coins: parseInt(coins),
    });

    if (updatedUser.data) showSentCoinsMsg(interaction, coins);
  },
  cooldown: 10,
};

export default command;
