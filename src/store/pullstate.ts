import { TGroup, TPost } from '@/types';
import { registerInDevtools, Store } from 'pullstate';

export interface AppProps {
  allChats: TGroup[];
  queryChats: TGroup[];
  selectedChat: TGroup | null;

  allFeeds: TPost[];
  queryFeeds: TPost[];
  selectedFeed: TPost | null;

  filter: string;
}

export const AppStore = new Store<AppProps>({
  allChats: [],
  queryChats: [],
  selectedChat: null,

  allFeeds: [],
  queryFeeds: [],
  selectedFeed: null,

  filter: '',
});

registerInDevtools({
  AppStore,
});
