/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface BuildInfo {
  appVersion: string;
}

export interface ChatCreateDto {
  /** @format int64 */
  chatId: number;
  username: string;
  title: string;
  description: string;
  logoUrl: string;
  /** @format date-time */
  createTime: string;
}

export interface ChatDto {
  /** @format int64 */
  id: number;
  username: string;
  title: string;
  description: string;
  link: string;
  logoUrl: string;
  /** @format date-time */
  createTime: string;
  /** @format date-time */
  lastActivityTime: string;
}

export interface ChatUpdateDto {
  /** @format int64 */
  chatId: number;
  title?: string | null;
  description?: string | null;
  logoUrl?: string | null;
}

export interface MediaDto {
  photoUrl?: string | null;
  videoFileName?: string | null;
  videoThumbUrl?: string | null;
}

export interface MessageCreateDto {
  /** @format int64 */
  messageId: number;
  /** @format int64 */
  chatId: number;
  text: string;
  /** @format date-time */
  createTime: string;
  photoUrl?: string | null;
  videoFileName?: string | null;
  videoThumbUrl?: string | null;
  mediaGroupId?: string | null;
}

export interface MessageDeleteDto {
  messageId: number[];
  /** @format int64 */
  chatId: number;
}

export interface MessageDto {
  /** @format int64 */
  id: number;
  /** @format int64 */
  messageId: number;
  /** @format int64 */
  chatId: number;
  text: string;
  link: string;
  /** @format date-time */
  createTime: string;
  /** @format date-time */
  editTime?: string | null;
  media: MediaDto[];
}

export interface MessageUpdateDto {
  /** @format int64 */
  messageId: number;
  /** @format int64 */
  chatId: number;
  /** @format date-time */
  createTime: string;
  /** @format date-time */
  editTime: string;
  text?: string | null;
  photoUrl?: string | null;
  videoFileName?: string | null;
  videoThumbUrl?: string | null;
  mediaGroupId?: string | null;
}

export interface ProviderChatDto {
  /** @format int64 */
  id: number;
  username: string;
  title: string;
  description: string;
}
