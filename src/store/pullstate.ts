import { registerInDevtools, Store } from 'pullstate';
import { TChat, TFeed } from '@/types';

export interface AppProps {
  allChats: TChat[];
  selectedChat: TChat | null;

  allFeeds: TFeed[];
  selectedFeed: TFeed | null;

  filter: string;
  filterClearTrigger: number;
}

export const AppStore = new Store<AppProps>({
  allChats: [],
  selectedChat: null,

  allFeeds: [],
  selectedFeed: null,

  filter: '',
  filterClearTrigger: 0,
});

registerInDevtools({
  AppStore,
});