function getUrl(host: string): string {
  switch (host) {
    case 'echochat.press':
      return 'https://tlgm.grkf.ru/prod-echochat/api';
    case 'sa-echomem.web.app':
    case 'memecho.press':
      return 'https://tlgm.grkf.ru/prod-echomem/api';
    case 'sa-echofan.web.app':
    case 'fanecho.press':
      return 'https://tlgm.grkf.ru/prod-echofan/api';
    case 'sa-echofin.web.app':
    case 'finecho.press':
      return 'https://tlgm.grkf.ru/prod-echofin/api';
    default:
      return 'https://tlgm.grkf.ru/stage/api';
  }
}

const url = getUrl(window.location.host);

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
