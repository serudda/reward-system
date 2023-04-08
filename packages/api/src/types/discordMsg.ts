export interface DiscordMsg {
  username?: string;
  avatar_url?: string;
  content?: string;
  embeds?: Embed[];
  // TODO: add components type
  components?: any[];
}

export interface Embed {
  title?: string;
  color?: number | string;
  description?: string;
  timestamp?: Date;
  url?: string;
  author?: Author;
  image?: Image;
  thumbnail?: Image;
  footer?: Footer;
  fields?: Field[];
}

export interface Author {
  name?: string;
  url?: string;
  icon_url?: string;
}

export interface Field {
  name?: string;
  value?: string;
  inline?: boolean;
}

export interface Footer {
  text?: string;
  icon_url?: string;
}

export interface Image {
  url?: string;
}
