import { SlashCommandBuilder, type CacheType, type CommandInteraction, type User as UserDiscord } from 'discord.js';

import { api } from '../api';
import i18n from '../i18n';
import translate from '../i18n/en.json';
import { type SlashCommand } from '../types';

const showSentCoinsMsg = (interaction: CommandInteraction<CacheType>, coins: string) => {
  const receiver = interaction.options.getUser('user');

  const bodyMessage = i18n.t('commands.pay.paymentSuccess', {
    sender: `<@${interaction.user.id}>`,
    coins: coins,
    receiver: `<@${receiver?.id}>`,
  });

  void interaction.reply(bodyMessage);
};

/**
 * This command, allow to send coins to other users.
 */
const command: SlashCommand = {
  command: new SlashCommandBuilder()
    .setName('pay')
    .setDescription(translate.commands.pay.pay)
    .addUserOption((option) => option.setName('user').setDescription(translate.commands.pay.receiver).setRequired(true))
    .addStringOption((option) =>
      option.setName('coins').setDescription(translate.commands.pay.amount).setRequired(true),
    ),
  execute: async (interaction) => {
    const receiver = interaction.options.getUser('user');
    // TODO: Fix an Type issue with .getString, it is not recognized as a function
    const coins: string = (interaction.options as any).getString('coins'); // eslint-disable-line @typescript-eslint/no-unsafe-assignment
    //Check if the user is trying to send coins to himself
    if (interaction.user === receiver) {
      const bodyMessage = i18n.t('commands.pay.autoPay', {});
      await interaction.reply(bodyMessage);
    } else {
      // Update or Create User
      const response = await api.user.payCoinsByUserId.mutate({
        receiver: receiver as UserDiscord,
        sender: interaction.user,
        coins: parseInt(coins),
      });

      if (response.status === 'error') await interaction.reply({ content: response.message });

      if (response.data) showSentCoinsMsg(interaction, coins);
    }
  },
  cooldown: 10,
};

export default command;
