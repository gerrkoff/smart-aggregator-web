export function getMessageLastTime(msg) {
  return msg.EditTime ?? msg.CreateTime;
}

export const toDateFormat = (editTime, createTime) => {
  const data = editTime ? editTime : createTime
  const time = new Date(data).toLocaleTimeString();
  const day = new Date(data).toLocaleDateString();
  return `${ time } ${ day }`
}
