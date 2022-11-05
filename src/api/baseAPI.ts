const url =
  window.location.host === 'tlgm.grkf.ru'
    ? 'https://grkf.ru/tlgm/prod/api'
    : 'https://grkf.ru/tlgm/stage/api';

class BaseAPI {
  getBuildInfo = async (): Promise<unknown> => {
    const response = await fetch(`${url}/misc/buildinfo`);
    return response.json();
  };

  getGroups = async (): Promise<unknown> => {
    const response = await fetch(`${url}/chat`);
    return response.json();
  };

  getFeed = async (): Promise<unknown> => {
    const response = await fetch(`${url}/message/feed`);
    return response.json();
  };

  getPosts = async (chatId: number): Promise<unknown> => {
    const response = await fetch(`${url}/message?chatId=${chatId}`);
    return response.json();
  };
}

export const baseAPI = new BaseAPI();
