import { Api } from './Api';

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

// TODO: перевести определение адреса api на переменные окружения (process.env.REACT_APP_API_BASE_URL)
const baseUrl = getUrl(window.location.host);

export const api = new Api({ baseUrl });

export * from './data-contracts';
export * from './useChat';
export * from './useChats';
export * from './useFeed';
export * from './useMessage';
export * from './useSearchChart';
export * from './useSearchMessage';
