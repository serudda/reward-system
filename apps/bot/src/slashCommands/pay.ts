/* Dependencies */
import { SlashCommandBuilder, type CacheType, type CommandInteraction, type User as UserDiscord } from 'discord.js';

/* API */
import { api } from '../api';
/* i18n */
import i18n from '../i18n';
import translate from '../i18n/en.json';
import { type SlashCommand } from '../types';

const showSentCoinsMsg = (interaction: CommandInteraction<CacheType>, coins: string, sender) => {
  const receiver = interaction.options.getUser('user');

  void interaction.reply(
    i18n.t('commands.pay.paymentSuccess', {
      sender: `<@${interaction.user.id}>`,
      coins: coins,
      receiver: `<@${receiver.id}>`,
      balanceSender: sender.coins,
    }),
  );
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
      const updatedUser = await api.user.payCoinsByUserId.mutate({
        receiver: user as UserDiscord,
        sender: interaction.user,
        coins: parseInt(coins),
      });

      if (updatedUser?.status === 'failed') {
        void interaction.reply(updatedUser?.message);
      }

      if (updatedUser.data) showSentCoinsMsg(interaction, coins, updatedUser.data.sender);
    }
  },
  cooldown: 10,
};

export default command;
