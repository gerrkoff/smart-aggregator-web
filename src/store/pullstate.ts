import { registerInDevtools, Store } from 'pullstate';

export interface ChartProps {
  id: number;
  username: string;
  title: string;
  description: string;
  link: string;
  logoUrl: string;
  createTime: string;
  lastActivityTime: string;
}

export interface Group {
  id: number;
  messageId: number;
  chatId: number;
  text: string;
  link: string;
  createTime: string;
  editTime?: string;
  media: GroupMedia[];
}

export interface GroupMedia {
  photoUrl?: any;
  videoFileName?: any;
  videoThumbUrl: string;
}

export interface AppProps {
  allChats: ChartProps[];
  selectedChat: ChartProps | null;
  allGroup: Group[];
  selectedGroup: Group | null;
  filter: string;
}

export const AppStore = new Store<AppProps>({
  allChats: [],
  selectedChat: null,
  allGroup: [],
  selectedGroup: null,
  filter: '',
});

registerInDevtools({
  AppStore,
});
