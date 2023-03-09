import { PermissionFlagsBits } from "discord.js";
import { Command } from "../types";

// NOTE: This the legacy way to create commands. The new way is to use slash commands.
const command: Command = {
	name: "greet",
	execute: (message: any, args) => {
		let toGreet = message.mentions.members?.first();
		message.channel.send(
			`Hello there ${
				toGreet ? toGreet.user.username : message.member?.user.username
			}!`
		);
	},
	cooldown: 10,
	aliases: ["sayhello"],
	permissions: ["Administrator", PermissionFlagsBits.ManageEmojisAndStickers], // to test
};

export default command;
