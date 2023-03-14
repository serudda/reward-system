import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
  SlashCommandBuilder,
  type CacheType,
  type CommandInteraction,
  type User,
} from 'discord.js';

import { api } from '../api';
import translate from '../i18n/en.json';
import { type SlashCommand } from '../types';

const showUserWalletMsg = (interaction: CommandInteraction<CacheType>, coins: string) => {
  void interaction.reply({
    embeds: [new EmbedBuilder().setAuthor({ name: translate.wallet.description }).setDescription(coins)],
  });
};

const showInviteLink = (interaction: CommandInteraction<CacheType>) => {
  // Button
  const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder()
      .setLabel(translate.wallet.connectDiscord)
      .setStyle(ButtonStyle.Link)
      .setURL('http://localhost:3000/api/auth/signin?callbackUrl=http://localhost:3000'),
  );

  // Message
  const embed = new EmbedBuilder()
    .setColor('#5865F2')
    .setTitle(translate.wallet.create)
    .setDescription(translate.wallet.noWallet);

  void interaction.reply({ ephemeral: true, embeds: [embed], components: [row] });
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
    console.log('interaction', interaction);
    const user = interaction.options.getUser('user');
    const coins = (interaction.options as any).getString('coins');

    console.log('user', user);

    const sentCoins = await api.user.sendCoinsByUserId.mutate({ user: user as User, coins: parseInt(coins) });

    console.log('sentCoins', sentCoins);

    // if (user) showUserWalletMsg(interaction, user.coins.toString());
    // else showInviteLink(interaction);
  },
  cooldown: 10,
};

export default command;
