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

import {
  BuildInfo,
  ChatCreateDto,
  ChatDto,
  ChatUpdateDto,
  MessageCreateDto,
  MessageDeleteDto,
  MessageDto,
  MessageUpdateDto,
  ProviderChatDto,
} from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';

export class Api<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags Chat
   * @name ChatList
   * @request GET:/api/Chat
   */
  chatList = (
    query?: {
      /** @format int32 */
      limit?: number;
      /** @format int32 */
      offset?: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<ChatDto[], any>({
      path: `/api/Chat`,
      method: 'GET',
      query: query,
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags Message
   * @name MessageFeedList
   * @request GET:/api/Message/Feed
   */
  messageFeedList = (
    query?: {
      /** @format int32 */
      limit?: number;
      /** @format int32 */
      offset?: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<MessageDto[], any>({
      path: `/api/Message/Feed`,
      method: 'GET',
      query: query,
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags Message
   * @name MessageList
   * @request GET:/api/Message
   */
  messageList = (
    query?: {
      /** @format int64 */
      chatId?: number;
      /** @format int32 */
      limit?: number;
      /** @format int32 */
      offset?: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<MessageDto[], any>({
      path: `/api/Message`,
      method: 'GET',
      query: query,
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags Message
   * @name MessageDetail
   * @request GET:/api/Message/{id}
   */
  messageDetail = (id: number, params: RequestParams = {}) =>
    this.request<MessageDto, any>({
      path: `/api/Message/${id}`,
      method: 'GET',
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags Misc
   * @name MiscBuildInfoList
   * @request GET:/api/Misc/BuildInfo
   */
  miscBuildInfoList = (params: RequestParams = {}) =>
    this.request<BuildInfo, any>({
      path: `/api/Misc/BuildInfo`,
      method: 'GET',
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags Search
   * @name SearchChatList
   * @request GET:/api/Search/Chat
   */
  searchChatList = (
    query?: {
      query?: string;
      /** @format int32 */
      limit?: number;
      /** @format int32 */
      offset?: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<ChatDto[], any>({
      path: `/api/Search/Chat`,
      method: 'GET',
      query: query,
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags Search
   * @name SearchMessageList
   * @request GET:/api/Search/Message
   */
  searchMessageList = (
    query?: {
      query?: string;
      /** @format int32 */
      limit?: number;
      /** @format int32 */
      offset?: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<MessageDto[], any>({
      path: `/api/Search/Message`,
      method: 'GET',
      query: query,
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags TelegramProvider
   * @name TelegramProviderCreateChatCreate
   * @request POST:/api/TelegramProvider/CreateChat
   */
  telegramProviderCreateChatCreate = (data: ChatCreateDto, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/TelegramProvider/CreateChat`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags TelegramProvider
   * @name TelegramProviderUpdateChatCreate
   * @request POST:/api/TelegramProvider/UpdateChat
   */
  telegramProviderUpdateChatCreate = (data: ChatUpdateDto, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/TelegramProvider/UpdateChat`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags TelegramProvider
   * @name TelegramProviderCreateMessageCreate
   * @request POST:/api/TelegramProvider/CreateMessage
   */
  telegramProviderCreateMessageCreate = (data: MessageCreateDto, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/TelegramProvider/CreateMessage`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags TelegramProvider
   * @name TelegramProviderUpdateMessageCreate
   * @request POST:/api/TelegramProvider/UpdateMessage
   */
  telegramProviderUpdateMessageCreate = (data: MessageUpdateDto, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/TelegramProvider/UpdateMessage`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags TelegramProvider
   * @name TelegramProviderDeleteMessageCreate
   * @request POST:/api/TelegramProvider/DeleteMessage
   */
  telegramProviderDeleteMessageCreate = (data: MessageDeleteDto, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/TelegramProvider/DeleteMessage`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags TelegramProvider
   * @name TelegramProviderGetChatList
   * @request GET:/api/TelegramProvider/GetChat
   */
  telegramProviderGetChatList = (
    query?: {
      /** @format int64 */
      id?: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<ProviderChatDto, any>({
      path: `/api/TelegramProvider/GetChat`,
      method: 'GET',
      query: query,
      format: 'json',
      ...params,
    });
}
