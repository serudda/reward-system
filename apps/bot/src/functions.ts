import { PermissionFlagsBits, type GuildMember, type PermissionResolvable, type TextChannel } from 'discord.js';
import { type GuildOption } from './@types/discord';

/**
This function checks whether a given GuildMember has an array of permissions and returns an array of the missing permissions as strings.

* @param {GuildMember} member - The member whose permissions are being checked.
* @param {Array<PermissionResolvable>} permissions - The permissions to check.
* @returns {Array<string>} - An array of missing permissions.

The function loops through the input permissions array and adds any missing permissions to a neededPermissions array. If the neededPermissions array is empty, it returns null. Otherwise, it maps the neededPermissions array and formats each permission string or flag for readability.
**/
export const checkPermissions = (member: GuildMember, permissions: Array<PermissionResolvable>) => {
  const neededPermissions: PermissionResolvable[] = [];
  permissions.forEach((permission) => {
    if (!member.permissions.has(permission)) neededPermissions.push(permission);
  });
  if (neededPermissions.length === 0) return null;
  return neededPermissions.map((p) => {
    if (typeof p === 'string') return p.split(/(?=[A-Z])/).join(' ');
    else
      return Object.keys(PermissionFlagsBits)
        .find((k) => Object(PermissionFlagsBits)[k] === p)
        ?.split(/(?=[A-Z])/)
        .join(' ');
  });
};

/**
This function sends a message to a Discord TextChannel and deletes it after a set duration.

* @param {string} message - The message to send.
* @param {TextChannel} channel - The channel to send the message in.
* @param {number} duration - The duration in milliseconds for which the message should be displayed.
* @returns {void}

The function sends the message to the channel using channel.send(), schedules the message to be deleted after duration with setTimeout(), and returns nothing. It's useful for temporary messages that don't need to persist in the channel's history.
 */
export const sendTimedMessage = (message: string, channel: TextChannel, duration: number) => {
  void channel.send(message).then((m) => setTimeout(async () => (await channel.messages.fetch(m)).delete(), duration));
  return;
};

/**
This function gets a GuildOption from the database or returns the default value.

* @param {GuildOption} option - The option to get.
* @returns {Promise} - The value of the option key in the options object.

The function searches the database for a guild with a matching ID and returns the value of the specified option key in the options object. If no guild is found, it returns null.
 */
export const getGuildOption = (option: GuildOption) => {
  const foundGuild = {
    guildID: process.env.DISCORD_SERVER_ID,
    options: {
      prefix: process.env.PREFIX,
    },
  };
  if (!foundGuild) return null;
  return foundGuild.options[option];
};
