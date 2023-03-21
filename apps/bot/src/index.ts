import { readdirSync } from 'fs';
import { join } from 'path';
import { Client, Collection, GatewayIntentBits, Partials } from 'discord.js';

import { type SlashCommand } from './types';

const { Guilds, MessageContent, GuildMessages, GuildMembers, GuildMessageReactions } = GatewayIntentBits;
const { GuildMember, Message, Channel, Reaction, User } = Partials;

// Initialize the Discord Client
const client = new Client({
  intents: [Guilds, MessageContent, GuildMessages, GuildMembers, GuildMessageReactions],
  partials: [Message, Channel, Reaction, User, GuildMember],
});

client.slashCommands = new Collection<string, SlashCommand>();
client.cooldowns = new Collection<string, number>();

const handlersDir = join(__dirname, './handlers');
readdirSync(handlersDir).forEach((handler) => {
  void require(`${handlersDir}/${handler}`)(client);
});

void client.login(process.env.DISCORD_BOT_TOKEN);
