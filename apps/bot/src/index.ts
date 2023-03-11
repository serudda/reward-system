import { Client, GatewayIntentBits, Collection } from 'discord.js';
import { SlashCommand } from './types';
import { readdirSync } from 'fs';
import { join } from 'path';

const { Guilds, MessageContent, GuildMessages, GuildMembers } = GatewayIntentBits;

// Initialize the Discord Client
const client = new Client({
  intents: [Guilds, MessageContent, GuildMessages, GuildMembers],
});

client.slashCommands = new Collection<string, SlashCommand>();
client.cooldowns = new Collection<string, number>();

const handlersDir = join(__dirname, './handlers');
readdirSync(handlersDir).forEach((handler) => {
  require(`${handlersDir}/${handler}`)(client);
});

client.login(process.env.DISCORD_BOT_TOKEN);
