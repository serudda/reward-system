export interface DiscordMsgType {
  username?: string;
  avatar_url?: string;
  content?: string;
  embeds?: DiscordMsgEmbedType[];
  // TODO: add components type
  components?: any[];
}

export interface DiscordMsgEmbedType {
  title?: string;
  color?: number | string;
  description?: string;
  timestamp?: Date;
  url?: string;
  author?: DiscordMsgAuthorType;
  image?: DiscordMsgImageType;
  thumbnail?: DiscordMsgImageType;
  footer?: DiscordMsgFooterType;
  fields?: DiscordMsgFieldType[];
}

export interface DiscordMsgAuthorType {
  name?: string;
  url?: string;
  icon_url?: string;
}

export interface DiscordMsgFieldType {
  name?: string;
  value?: string;
  inline?: boolean;
}

export interface DiscordMsgFooterType {
  text?: string;
  icon_url?: string;
}

export interface DiscordMsgImageType {
  url?: string;
}
