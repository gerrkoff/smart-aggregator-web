export enum RequestStatus {
  INIT = 'INIT',
  REQUEST = 'REQUEST',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

export enum ReactQueryKey {
  buildInfo = 'BUILD_INFO',

  chats = 'CHATS',
  chatsQuery = 'CHATS_QUERY',

  feeds = 'FEEDS',
  feedsQuery = 'FEEDS_QUERY',
  feedsByChatId = 'FEEDS_BY_CHAT_ID',

  posts = 'POSTS',
}

export type TBuild = {
  appVersion: string;
};

type TMedia = {
  photoUrl: string;
  videoFileName: string | null;
  videoThumbUrl: string | null;
};

export type TUseParams = {
  chatId: string;
  feedId: string;
};

export type TChat = {
  id: number;
  username: string;
  title: string;
  description: string;
  link: string;
  logoUrl: string;
  createTime: string;
  lastActivityTime?: string;
};

export type TFeed = {
  id: number;
  messageId: number;
  chatId: number;
  text: string;
  link: string;
  createTime: string;
  editTime: string;
  media: TMedia[];
};

export const SEARCH_STATUS = {
  default: 'DEFAULT',
  success: 'SUCCESS',
  error: 'ERROR',
};
