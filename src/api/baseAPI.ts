import { TBuild, TGroup, TPost } from '@/types';

const url =
  window.location.host === 'echochat.press'
    ? 'https://grkf.ru/tlgm/prod/api'
    : 'https://grkf.ru/tlgm/stage/api';

class BaseAPI {
  getBuildInfo = async (): Promise<TBuild> => {
    const response = await fetch(`${url}/misc/buildinfo`);
    return response.json();
  };

  /** Get All chats */
  getGroups = async (): Promise<TGroup[]> => {
    const response = await fetch(`${url}/chat`);
    return response.json();
  };

  /** Get chats by query */
  getGroupsByQuery = async (query: string | number): Promise<TGroup[]> => {
    const response = await fetch(`${url}/search/chat?query=${query}`);
    return response.json();
  };

  /** Get All feeds */
  getFeed = async (): Promise<TPost[]> => {
    const response = await fetch(`${url}/message/feed`);
    return response.json();
  };

  /** Get feeds by chatId */
  getPosts = async (chatId: number): Promise<TPost[]> => {
    const response = await fetch(`${url}/message?chatId=${chatId}`);
    return response.json();
  };

  /** Get feeds by query */
  getPostsQuery = async (query: string | number): Promise<TPost[]> => {
    const response = await fetch(`${url}/search/message?query=${query}`);
    return response.json();
  };
}

export const baseAPI = new BaseAPI();
