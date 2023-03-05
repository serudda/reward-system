import fs from "fs";
import path from "path";
import { type Client, Collection } from "discord.js";
import { SlashCommand } from "./types/command";

// Register all the commands
export const registerCommands = (client: any) => {
	// Get the command files
	const commandsPath = path.join(__dirname, "commands");
	const commandFiles = fs
		.readdirSync(commandsPath)
		.filter((file) => file.endsWith(".ts"));

	// Create a new collection for the commands
	client.commands = new Collection();

	// Loop through the command files
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath) as SlashCommand;
		// Set a new item in the Collection with the key as the command name and the value as the exported module
		if ("data" in command && "execute" in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(
				`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
			);
		}
	}
};
