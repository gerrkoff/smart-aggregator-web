import { ChatDto } from '@/api';

export function getGroupLastTime(chat: ChatDto): number {
  return Date.parse(chat?.lastActivityTime ?? '') || Date.parse(chat?.createTime ?? '');
}
