import { SlashCommandBuilder, type CacheType, type CommandInteraction, type User as UserDiscord } from 'discord.js';
import { i18n } from '@acme/i18n';
import { type SlashCommand } from '../@types/discord';
import { api } from '../api';

const showSentCoinsMsg = (interaction: CommandInteraction<CacheType>, coins: string) => {
  const receiver = interaction.options.getUser('user');
  const message = i18n.t('bot:command.giveCoins.success.give', {
    sender: `<@${interaction.user.id}>`,
    coins,
    receiver: `<@${receiver?.id}>`,
    ephemeral: true,
  });

  void interaction.reply(message);
};

/** Main command */
const command: SlashCommand = {
  command: new SlashCommandBuilder()
    .setName('give-coins')
    .setDescription(i18n.t('bot:command.giveCoins.give'))
    .addUserOption((option) =>
      option.setName('user').setDescription(i18n.t('bot:command.giveCoins.receiver')).setRequired(true),
    )
    .addStringOption((option) =>
      option.setName('coins').setDescription(i18n.t('bot:command.giveCoins.amount')).setRequired(true),
    ),
  execute: async (interaction) => {
    try {
      const user = interaction.options.getUser('user');
      // TODO: Fix an Type issue with .getString, it is not recognized as a function
      const coins: string = (interaction.options as any).getString('coins'); // eslint-disable-line @typescript-eslint/no-unsafe-assignment

      // Check if user is trying to send less than 1 coins
      if (parseInt(coins) < 1) {
        const message = i18n.t('bot:common.error.invalidAmount', { ephemeral: true });
        await interaction.reply(message);
        return;
      }

      // Update or Create User
      const response = await api.user.sendCoinsByUserId.mutate({
        user: user as UserDiscord,
        coins: parseInt(coins),
      });

      if (response?.data) showSentCoinsMsg(interaction, coins);
    } catch (error: any) {
      if (!error) return;
      await interaction.reply({
        content: error?.message ? error.message : i18n.t('common:message.error.internalError'), // eslint-disable-line @typescript-eslint/no-unsafe-assignment
        ephemeral: true,
      });
    }
  },
  cooldown: 10,
};

export default command;
