export enum RequestStatus {
  INIT = 'INIT',
  REQUEST = 'REQUEST',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

export type TChat = {
  ChatId: number;
  Username: string;
  Title: string;
  Description: string;
  Link: string;
  LogoUrl: string;
  CreateTime: string;
}

export type TMessage = {
  ChatId: number;
  MessageId: number;
  Text: string;
  CreateTime: string;
  EditTime?: string;
  Link: string;
  PhotoUrl: string;
  VideoFileName: string;
  VideoThumbUrl: string;
}

export const SEARCH_STATUS = {
  default: 'DEFAULT',
  success: 'SUCCESS',
  error: 'ERROR',
}
