import { ChatDto } from '@/api';

export function getGroupLastTime(chat: ChatDto) {
  return Date.parse(chat?.lastActivityTime ?? '') || Date.parse(chat?.createTime ?? '');
}

export const toDateFormat = (data: number | string | Date) => {
  const time = new Date(data).toLocaleTimeString();
  const day = new Date(data).toLocaleDateString();
  return `${time} ${day}`;
};

// type DebounceCallback<R> = (...params: unknown[]) => R;
type DebounceCallback<R> = () => R;

export const debounce = <R>(callback: DebounceCallback<R>, ms: number) => {
  let isCooldown = false;

  return (...rest: unknown[]) => {
    if (isCooldown) {
      return;
    }

    callback.apply(this, rest);
    isCooldown = true;
    setTimeout(() => {
      isCooldown = false;
    }, ms);
  };
};
