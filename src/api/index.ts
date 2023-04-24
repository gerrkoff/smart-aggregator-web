import { Api } from './Api';

// TODO: перевести определение адреса api на переменные окружения (process.env.REACT_APP_API_BASE_URL)
const baseUrl =
  window.location.host === 'echochat.press' ? 'https://tlgm.grkf.ru/prod-echochat' : 'https://tlgm.grkf.ru/stage';

export const api = new Api({ baseUrl });

export * from './data-contracts';
export * from './useChat';
export * from './useChats';
export * from './useFeed';
export * from './useMessage';
export * from './useSearchChart';
export * from './useSearchMessage';
