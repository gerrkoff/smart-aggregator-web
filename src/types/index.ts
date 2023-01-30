export enum RequestStatus {
  INIT = 'INIT',
  REQUEST = 'REQUEST',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

type TMedia = {
  photoUrl: string;
  videoFileName: string | null;
  videoThumbUrl: string | null;
};

export type TGroup = {
  id: number;
  username: string;
  title: string;
  description: string;
  link: string;
  logoUrl: string;
  createTime: string;
  lastActivityTime?: string;
};

export type TPost = {
  chatId: string;
  messageId: number;
  text: string;
  createTime: string;
  editTime: string;
  link: string;
  media: TMedia[];
};

export const SEARCH_STATUS = {
  default: 'DEFAULT',
  success: 'SUCCESS',
  error: 'ERROR',
};
