import { EmbedBuilder, SlashCommandBuilder, type ColorResolvable, type TextChannel } from 'discord.js';

import { type SlashCommand } from '../types';

// NOTE: This is an example of a slash command that uses autocomplete.
const command: SlashCommand = {
  command: new SlashCommandBuilder()
    .setName('embed')
    .setDescription('Create a new embed message.')
    .addStringOption((option) => {
      return option.setName('title').setDescription('Title of the embed message').setRequired(true);
    })
    .addStringOption((option) => {
      return option.setName('description').setDescription('Description of the embed message.').setRequired(true);
    })
    .addChannelOption((option) => {
      return option
        .setName('channel')
        .setDescription('Text channel where the embed message will be sent.')
        .setRequired(true);
    })
    .addStringOption((option) => {
      return option
        .setName('color')
        .setDescription('Select an option or type an hex color, for example: #000000')
        .setRequired(true)
        .setAutocomplete(true);
    }),
  autocomplete: async (interaction) => {
    try {
      const focusedValue = interaction.options.getFocused();
      const choices = [
        { name: 'White', value: 'White' },
        { name: 'Aqua', value: 'Aqua' },
        { name: 'Green', value: 'Green' },
        { name: 'Blue', value: 'Blue' },
        { name: 'Yellow', value: 'Yellow' },
        { name: 'Purple', value: 'Purple' },
        { name: 'LuminousVividPink', value: 'LuminousVividPink' },
        { name: 'Fuchsia', value: 'Fuchsia' },
        { name: 'Gold', value: 'Gold' },
        { name: 'Orange', value: 'Orange' },
        { name: 'Red', value: 'Red' },
        { name: 'Grey', value: 'Grey' },
        { name: 'Navy', value: 'Navy' },
        { name: 'DarkAqua', value: 'DarkAqua' },
        { name: 'DarkGreen', value: 'DarkGreen' },
        { name: 'DarkBlue', value: 'DarkBlue' },
        { name: 'DarkPurple', value: 'DarkPurple' },
        { name: 'DarkVividPink', value: 'DarkVividPink' },
        { name: 'DarkGold', value: 'DarkGold' },
        { name: 'DarkOrange', value: 'DarkOrange' },
        { name: 'DarkRed', value: 'DarkRed' },
        { name: 'DarkGrey', value: 'DarkGrey' },
        { name: 'DarkerGrey', value: 'DarkerGrey' },
        { name: 'LightGrey', value: 'LightGrey' },
        { name: 'DarkNavy', value: 'DarkNavy' },
      ];
      const filtered: { name: string; value: string }[] = [];
      for (let i = 0; i < choices.length; i++) {
        const choice = choices[i] as { name: string; value: string };
        if (choice.name.includes(focusedValue)) filtered.push(choice);
      }
      void (await interaction.respond(filtered));
    } catch (error: any) {
      console.log(`Error: ${error.message}`);
    }
  },
  execute: async (interaction) => {
    try {
      await interaction.deferReply({ ephemeral: true });
      const options: any = {};
      if (!interaction.options) return interaction.editReply({ content: 'Something went wrong...' });
      for (let i = 0; i < interaction.options.data.length; i++) {
        const element = interaction.options.data[i];
        if (element?.name && element?.value) options[element.name] = element.value;
      }
      const embed = new EmbedBuilder()
        .setColor(options.color.toString() as ColorResolvable)
        .setTitle(options.title.toString() as string)
        .setDescription(options.description.toString() as string)
        .setAuthor({
          name: interaction.client.user?.username || 'Default Name',
          iconURL: interaction.client.user?.avatarURL() || undefined,
        })
        .setThumbnail(interaction.client.user?.avatarURL() || null)
        .setTimestamp()
        .setFooter({
          text: 'Test embed message',
          iconURL: interaction.client.user?.avatarURL() || undefined,
        });
      const selectedTextChannel = interaction.channel?.client.channels.cache.get(
        options.channel.toString() as string,
      ) as TextChannel;
      void selectedTextChannel.send({ embeds: [embed] });
      return interaction.editReply({
        content: 'Embed message successfully sent.',
      });
    } catch (error) {
      void interaction.editReply({ content: 'Something went wrong...' });
    }
  },
  cooldown: 10,
};

export default command;
