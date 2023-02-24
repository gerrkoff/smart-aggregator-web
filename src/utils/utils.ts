import { TChat, TFeed } from '@/types';

export function getGroupLastTime(chat: TChat) {
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

export const sortChats = (chats: TChat[]) => {
  return chats.sort(
    (a: TChat, b: TChat) => getGroupLastTime(b) - getGroupLastTime(a),
  );
};

export const sortFeeds = (feeds: TFeed[]) => {
  return feeds.sort(
    (a: TFeed, b: TFeed) => Date.parse(b.createTime) - Date.parse(a.createTime),
  );
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
