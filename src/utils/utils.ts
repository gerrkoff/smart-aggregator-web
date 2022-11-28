export function getGroupLastTime(chat) {
  return Date.parse(chat?.lastActivityTime) || Date.parse(chat?.createTime);
}

export const toDateFormat = (data) => {
  const time = new Date(data).toLocaleTimeString();
  const day = new Date(data).toLocaleDateString();
  return `${time} ${day}`
}

export const debounce = (callback, ms) => {
  let isCooldown = false;

  return function () {
    if (isCooldown) {
      return;
    }

    callback.apply(this, arguments);
    isCooldown = true;
    setTimeout(() => isCooldown = false, ms);
  };
}
