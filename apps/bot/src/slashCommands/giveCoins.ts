import { SlashCommandBuilder, type CacheType, type CommandInteraction, type User as UserDiscord } from 'discord.js';

import { api } from '../api';
import translate from '../i18n/en.json';
import { type SlashCommand } from '../types';

const showSentCoinsMsg = (interaction: CommandInteraction<CacheType>, coins: string) => {
  const receiver = interaction.options.getUser('user');
  void interaction.reply(`${interaction.user} a agregado ${coins} Indie Tokens a wallet de ${receiver}.`);
};

/** Main command */
const command: SlashCommand = {
  command: new SlashCommandBuilder()
    .setName('give-coins')
    .setDescription('Dar Indie Tokens a un usuario en específico')
    .addUserOption((option) => option.setName('user').setDescription(`The receiver's username`).setRequired(true))
    .addStringOption((option) =>
      option.setName('coins').setDescription('Set the amount of coins you want to give.').setRequired(true),
    ),
  execute: async (interaction) => {
    const user = interaction.options.getUser('user');
    const coins: string = (interaction.options as any).getString('coins');

    const updatedUser = await api.user.sendCoinsByUserId.mutate({ user: user as UserDiscord, coins: parseInt(coins) });

    if (updatedUser.data) showSentCoinsMsg(interaction, coins);
  },
  cooldown: 10,
};

export default command;
