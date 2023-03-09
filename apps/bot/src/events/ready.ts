import { Client } from "discord.js";
import { BotEvent } from "../types";

/*
This  sets up an event listener that triggers once when the bot is logged in and ready to execute commands.It logs a message to the console with the bot's tag to confirm successful login. */
const event: BotEvent = {
  name: "ready",
  once: true,
  execute: (client: Client) => {
    console.log(`💪 Logged in ${client.user?.tag}`);
  },
};

export default event;
