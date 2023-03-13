import { readdirSync } from 'fs';
import { join } from 'path';
import { Client, REST, Routes, SlashCommandBuilder } from 'discord.js';

import { SlashCommand } from '../types';

// This code registers slash commands for a Discord bot by loading command files from a directory, creating a builder array, setting commands in the client's collection, using the Discord REST API to PUT the commands, and logging the number of commands loaded.
module.exports = (client: Client) => {
  const slashCommands: SlashCommandBuilder[] = [];

  let slashCommandsDir = join(__dirname, '../slashCommands');

  readdirSync(slashCommandsDir).forEach((file) => {
    if (!file.endsWith('.ts')) return;
    let command: SlashCommand = require(`${slashCommandsDir}/${file}`).default;
    slashCommands.push(command.command);
    client.slashCommands.set(command.command.name, command);
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
};
