interface User {
  avatar: string | null;
  discriminator: string;
  id: string;
}

/**
 * setThumbnailUrl return url to discord user image, for expose in the command return.
 * @param user
 * @returns
 */

export const setThumbnailUrl = (user: User): string => {
  if (user.avatar === null) {
    // TODO: Mirar bien si ya no viene mas el discriminator.
    const defaultAvatarNumber = parseInt(user.discriminator) % 5;
    return `https://cdn.discordapp.com/embed/avatars/${defaultAvatarNumber}.png`;
  } else {
    const format = user.avatar.startsWith('a_') ? 'gif' : 'png';
    return `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.${format}`;
  }
};
