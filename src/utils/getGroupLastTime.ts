import { ChatDto } from '@/api';

export function getGroupLastTime(chat: ChatDto) {
  return Date.parse(chat?.lastActivityTime ?? '') || Date.parse(chat?.createTime ?? '');
}
