import { TGroup } from '@/types';

export function getGroupLastTime(chat: TGroup) {
  return (
    Date.parse(chat?.lastActivityTime ?? '') ||
    Date.parse(chat?.createTime ?? '')
  );
}

export const toDateFormat = (data) => {
  const time = new Date(data).toLocaleTimeString();
  const day = new Date(data).toLocaleDateString();
  return `${time} ${day}`;
};

export const debounce = (callback, ms) => {
  let isCooldown = false;

  return (...rest) => {
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
