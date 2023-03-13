import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  CacheType,
  CommandInteraction,
  EmbedBuilder,
  SlashCommandBuilder,
} from 'discord.js';

import { api } from '../api';
import translate from '../i18n/en.json';
import { SlashCommand } from '../types';

const showUserWalletMsg = async (interaction: CommandInteraction<CacheType>, coins: string) => {
  interaction.reply({
    embeds: [new EmbedBuilder().setAuthor({ name: translate.wallet.description }).setDescription(coins)],
  });
};

const showInviteLink = async (interaction: CommandInteraction<CacheType>) => {
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

  await interaction.reply({ ephemeral: true, embeds: [embed], components: [row] });
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
