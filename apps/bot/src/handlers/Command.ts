import { Client, REST, Routes, SlashCommandBuilder } from "discord.js";
import { readdirSync } from "fs";
import { join } from "path";
import { SlashCommand } from "../types";

// This function read every file in the slashCommands folder, create an slashCommand array and register them to the Discord REST API
module.exports = (client: Client) => {
  const slashCommands: SlashCommandBuilder[] = [];

  let slashCommandsDir = join(__dirname, "../slashCommands");

  readdirSync(slashCommandsDir).forEach((file) => {
    if (!file.endsWith(".ts")) return;
    let command: SlashCommand = require(`${slashCommandsDir}/${file}`).default;
    slashCommands.push(command.command);
    client.slashCommands.set(command.command.name, command);
  });

  const rest = new REST({ version: "10" }).setToken(
    process.env.DISCORD_BOT_TOKEN
  );

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
