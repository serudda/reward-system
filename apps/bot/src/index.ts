// Require the necessary discord.js classes
import { Client, Events } from "discord.js";
import { config, intentOptions } from "./config";
import { registerCommands } from "./register";

// Create a new client instance
const client = new Client({ intents: intentOptions });

// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, (c) => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
});

// Register all commands
registerCommands(client);

// Log in to Discord with your client's token
void client.login(
	"MTA3NzAwOTE4MTUxNDY3ODI3Mw.GIJTJR.GqxhAKmT1-g3M0zF__jnE5gzCKesmYKtahzE0s"
);

client.on("messageCreate", (message) => {
	console.log(message.content);
});
