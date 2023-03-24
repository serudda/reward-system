/**
 * setThemThumnail return url to discord user image, for expose in the command return.
 * @param user
 * @returns
 */

interface User {
  avatar: string | null;
  discriminator: string;
  id: string;
}

const setTempThumbnail = (user: User) => {
  if (user.avatar === null) {
    const defaultAvatarNumber = parseInt(user.discriminator) % 5;
    return `https://cdn.discordapp.com/embed/avatars/${defaultAvatarNumber}.png`;
  } else {
    const format = user.avatar.startsWith('a_') ? 'gif' : 'png';
    return `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.${format}`;
  }
};

export default setTempThumbnail;
