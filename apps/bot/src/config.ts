import { GatewayIntentBits } from "discord.js";
// import { env } from "@/env.mjs";

export const config = {
	prefix: "!",
	token: "",
};

export const intentOptions: Array<GatewayIntentBits> = [
	GatewayIntentBits.Guilds,
	GatewayIntentBits.GuildMessages,
	GatewayIntentBits.MessageContent,
];
