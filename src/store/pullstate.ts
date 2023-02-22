import { registerInDevtools, Store } from 'pullstate';
import { TChat, TFeed } from '@/types';

export interface AppProps {
  allChats: TChat[];
  queryChats: TChat[];
  selectedChat: TChat | null;

  allFeeds: TFeed[];
  queryFeeds: TFeed[];
  selectedFeed: TFeed | null;

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
