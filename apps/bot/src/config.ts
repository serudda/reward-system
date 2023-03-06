import { GatewayIntentBits } from "discord.js";

export const config = {
	prefix: "/",
	token: process.env.DISCORD_TOKEN,
};

export const intentOptions: Array<GatewayIntentBits> = [
	GatewayIntentBits.Guilds,
	GatewayIntentBits.GuildMessages,
	GatewayIntentBits.MessageContent,
];
