const url =
  window.location.host === 'tlgm.grkf.ru'
    ? 'https://grkf.ru/tlgm/prod/api'
    : 'https://grkf.ru/tlgm/stage/api';

class BaseAPI {
  getBuildInfo = async (): Promise<unknown> => {
    const response = await fetch(`${url}/misc/buildinfo`);
    return response.json();
  };
}

export const baseAPI = new BaseAPI();
