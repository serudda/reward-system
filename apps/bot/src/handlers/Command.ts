import { readdirSync } from 'fs';
import { join } from 'path';
import { REST, Routes, type Client, type SlashCommandBuilder } from 'discord.js';
import i18n from '@acme/i18n';
import { type SlashCommand } from '../types';

// This code registers slash commands for a Discord bot by loading command files from a directory, creating a builder array, setting commands in the client's collection, using the Discord REST API to PUT the commands, and logging the number of commands loaded.
module.exports = (client: Client) => {
  i18n.on('initialized', () => {
    const slashCommands: SlashCommandBuilder[] = [];

    const slashCommandsDir = join(__dirname, '../slashCommands');

    readdirSync(slashCommandsDir).forEach((file) => {
      if (!file.endsWith('.ts')) return;
      const command: SlashCommand = require(`${slashCommandsDir}/${file}`).default as SlashCommand;
      slashCommands.push(command.command as SlashCommandBuilder);
      client.slashCommands.set(command.command.name as string, command);
    });

    const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_BOT_TOKEN);

    // NOTE: Temporary code to delete a command
    // rest
    //   .put(Routes.applicationGuildCommands(process.env.DISCORD_CLIENT_ID, process.env.DISCORD_SERVER_ID), { body: [] })
    //   .then(() => console.log('Successfully deleted all guild commands.'))
    //   .catch(console.error);

    // rest
    //   .put(Routes.applicationCommands(process.env.DISCORD_CLIENT_ID), { body: [] })
    //   .then(() => console.log('Successfully deleted all application commands.'))
    //   .catch(console.error);

    rest
      .put(Routes.applicationCommands(process.env.DISCORD_CLIENT_ID), {
        body: slashCommands.map((command) => command.toJSON()),
      })
      .then((data: any) => {
        console.log(`Successfully loaded ${data.length} slash command(s)`);
      })
      .catch((e) => {
        console.log(e);
      });
  });
};
