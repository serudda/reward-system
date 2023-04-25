import {
  EmbedBuilder,
  SlashCommandBuilder,
  type CacheType,
  type CommandInteraction,
} from 'discord.js';
import { i18n } from '@acme/i18n';
import { type SlashCommand } from '../@types/discord';
import { api } from '../api';

const showUserWalletMsg = (interaction: CommandInteraction<CacheType>, coins: string) => {
  const message = i18n.t('bot:command.wallet.description');
  void interaction.editReply({
    embeds: [new EmbedBuilder().setAuthor({ name: message }).setDescription(coins)],
  });
};

/** Main command */
const command: SlashCommand = {
  command: new SlashCommandBuilder()
    .setName('wallet')
    .setDescription(i18n.t('bot:command.wallet.show')),
  execute: async (interaction) => {
    try {
      // Defer the reply to allow more processing time
      await interaction.deferReply({ ephemeral: true });

      // Get User
      const user = await api.user.getByDiscordId.query({ discordId: interaction.user.id });

      // Create User
      if (!user) {
        const thumbnailUrl = interaction.user.avatarURL();

        const newUser = await api.user.create.mutate({
          name: interaction.user.username,
          image: thumbnailUrl ?? '',
        });

        if (!newUser?.data) return;

        const response = await api.account.create.mutate({
          provider: 'discord',
          providerAccountId: interaction.user.id,
          providerUsername: interaction.user.username,
          type: 'oauth',
          userId: newUser.data.user.id,
        });

        if (response?.data) showUserWalletMsg(interaction, newUser.data.user.coins.toString());
      } else showUserWalletMsg(interaction, user.coins.toString());
    } catch (error: any) {
      if (!error) return;
      await interaction.reply({
        content: error?.message ? error.message : i18n.t('common:message.error.internalError'), // eslint-disable-line @typescript-eslint/no-unsafe-assignment,
        ephemeral: true,
      });
    }
  },
  cooldown: 10,
};

export default command;
