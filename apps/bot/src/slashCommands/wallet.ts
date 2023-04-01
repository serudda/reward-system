import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
  SlashCommandBuilder,
  type CacheType,
  type CommandInteraction,
} from 'discord.js';

import i18n from '@acme/i18n';

import { api } from '../api';
import { type SlashCommand } from '../types';

const showUserWalletMsg = (interaction: CommandInteraction<CacheType>, coins: string) => {
  const message = i18n.t('app.bot.command.wallet.description');
  void interaction.reply({
    embeds: [new EmbedBuilder().setAuthor({ name: message }).setDescription(coins)],
  });
};

const showInviteLink = (interaction: CommandInteraction<CacheType>) => {
  // Button
  const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder()
      .setLabel(i18n.t('app.bot.command.wallet.connectDiscord'))
      .setStyle(ButtonStyle.Link)
      .setURL('http://localhost:3000/api/auth/signin?callbackUrl=http://localhost:3000'),
  );

  // Message
  const embed = new EmbedBuilder()
    .setColor('#5865F2')
    .setTitle(i18n.t('app.bot.command.wallet.create'))
    .setDescription(i18n.t('app.bot.command.wallet.noWallet'));

  void interaction.reply({ ephemeral: true, embeds: [embed], components: [row] });
};

/** Main command */
const command: SlashCommand = {
  command: new SlashCommandBuilder().setName('wallet').setDescription(i18n.t('app.bot.command.wallet.show')),
  execute: async (interaction) => {
    const user = await api.user.getByDiscordId.query({ discordId: interaction.user.id });

    if (user) showUserWalletMsg(interaction, user.coins.toString());
    else showInviteLink(interaction);
  },
  cooldown: 10,
};

export default command;
