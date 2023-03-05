import { type Collection } from "discord.js";

// Hack: https://stackoverflow.com/questions/69500556/discord-js-guide-property-commands-does-not-exist-on-type-clientboolean
declare module "discord.js" {
  export interface Client {
    commands: Collection<unknown, any>;
  }
}
