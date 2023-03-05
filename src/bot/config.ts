import { GatewayIntentBits } from "discord.js";
import { env } from "@/env.mjs";

export const config = {
  prefix: "!",
  token: env.DISCORD_CLIENT_SECRET,
};

export const intentOptions: Array<GatewayIntentBits> = [
  GatewayIntentBits.Guilds,
  GatewayIntentBits.GuildMessages,
];
