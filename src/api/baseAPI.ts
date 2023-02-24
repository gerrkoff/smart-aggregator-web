import { TBuild, TChat, TFeed } from '@/types';
import { sortChats, sortFeeds } from '@/utils/utils';

const url =
  window.location.host === 'echochat.press'
    ? 'https://grkf.ru/tlgm/prod/api'
    : 'https://grkf.ru/tlgm/stage/api';

class BaseAPI {
  getBuildInfo = async (): Promise<TBuild> => {
    const response = await fetch(`${url}/misc/buildinfo`);
    return response.json();
  };

  /** Get all recent chats */
  getChats = async (): Promise<TChat[]> => {
    const response = await fetch(`${url}/chat`);
    const chats = await response.json();
    return sortChats(chats);
  };

  /** Get chats by query */
  getChatsByQuery = async (query: string | number): Promise<TChat[]> => {
    const response = await fetch(`${url}/search/chat?query=${query}`);
    const chats = await response.json();
    return sortChats(chats);
  };

  /** Get all recent feeds */
  getFeeds = async (): Promise<TFeed[]> => {
    const response = await fetch(`${url}/message/feed`);
    const feeds = await response.json();
    return sortFeeds(feeds);
  };

  /** Get feeds by chatId */
  getFeedsByChatId = async (chatId: number): Promise<TFeed[]> => {
    const response = await fetch(`${url}/message?chatId=${chatId}`);
    const feeds = await response.json();
    return sortFeeds(feeds);
  };

  /** Get feeds by query */
  getFeedsByQuery = async (query: string | number): Promise<TFeed[]> => {
    const response = await fetch(`${url}/search/message?query=${query}`);
    const feeds = await response.json();
    return sortFeeds(feeds);
  };
}

export const baseAPI = new BaseAPI();
