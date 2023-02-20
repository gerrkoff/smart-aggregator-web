import { registerInDevtools, Store } from 'pullstate';
import { TGroup, TPost } from '@/types';

export interface AppProps {
  allChats: TGroup[];
  queryChats: TGroup[];
  selectedChat: TGroup | null;
  selectedChatId: number | null;

  allFeeds: TPost[];
  queryFeeds: TPost[];
  selectedFeed: TPost | null;

  filter: string;
}

export const AppStore = new Store<AppProps>({
  allChats: [],
  queryChats: [],
  selectedChat: null,
  selectedChatId: null,

  allFeeds: [],
  queryFeeds: [],
  selectedFeed: null,

  filter: '',
});

registerInDevtools({
  AppStore,
});
