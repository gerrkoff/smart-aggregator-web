export enum RequestStatus {
  INIT = 'INIT',
  REQUEST = 'REQUEST',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

export type TChat = {
  id: number;
  Username: string;
  title: string;
  description: string;
  link: string;
  logoUrl: string;
  CreateTime: string;
}

export type TMessage = {
  id: number;
  text: string;
  createTime: string;
  editTime?: string;
  link: string;
  media: [];
}

export const SEARCH_STATUS = {
  default: 'DEFAULT',
  success: 'SUCCESS',
  error: 'ERROR',
}
