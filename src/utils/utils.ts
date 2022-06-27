export function getMessageLastTime(msg) {
  return msg.EditTime ?? msg.CreateTime;
}

export const toDateFormat = (editTime, createTime) => {
  const data = editTime ? editTime : createTime
  const time = new Date(data).toLocaleTimeString();
  const day = new Date(data).toLocaleDateString();
  return `${ time } ${ day }`
}

export const debounce = (callback, ms) => {
  let isCooldown = false;

  return function() {
    if (isCooldown) {
      return;
    }

    callback.apply(this, arguments);
    isCooldown = true;
    setTimeout(() => isCooldown = false, ms);
  };
}
