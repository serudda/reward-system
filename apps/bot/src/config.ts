import { GatewayIntentBits } from "discord.js";

export const config = {
	prefix: "/",
	token: "",
};

export const intentOptions: Array<GatewayIntentBits> = [
	GatewayIntentBits.Guilds,
	GatewayIntentBits.GuildMessages,
	GatewayIntentBits.MessageContent,
];
