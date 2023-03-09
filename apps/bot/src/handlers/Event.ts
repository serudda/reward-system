import { Client } from "discord.js";
import { readdirSync } from "fs";
import { join } from "path";
import { BotEvent } from "../types";

// This function read every file in the events folder and register them to the Discord Client
module.exports = (client: Client) => {
	let eventsDir = join(__dirname, "../events");

	readdirSync(eventsDir).forEach((file) => {
		if (!file.endsWith(".ts")) return;
		let event: BotEvent = require(`${eventsDir}/${file}`).default;
		event.once
			? client.once(event.name, (...args) => event.execute(...args))
			: client.on(event.name, (...args) => event.execute(...args));
		console.log(`🌠 Successfully loaded event ${event.name}`);
	});
};
