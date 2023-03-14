import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
  SlashCommandBuilder,
  type CacheType,
  type CommandInteraction,
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
  command: new SlashCommandBuilder().setName('wallet').setDescription(translate.wallet.show),
  execute: async (interaction) => {
    const user = await api.user.getByDiscordId.query({ discordId: interaction.user.id });

    if (user) showUserWalletMsg(interaction, user.coins.toString());
    else showInviteLink(interaction);
  },
  cooldown: 10,
};

export default command;
