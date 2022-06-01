import { collection, getDocs } from 'firebase/firestore';

export async function getData(db, name) {
  const querySnapshot = await getDocs(collection(db, name));
  return querySnapshot.docs.map((x) => x.data());
}

export function getMessageLastTime(msg) {
  return msg.EditTime ?? msg.CreateTime;
}

export const toDateFormat = (editTime, createTime) => {
  const data = editTime ? editTime : createTime
  const time = new Date(data).toLocaleTimeString();
  const day = new Date(data).toLocaleDateString();
  return `${ time } ${ day }`
}

export const componentToNode = (component) => {
  const template = document.createElement('template');
  template.innerHTML = component;

  return template.content.firstElementChild;
}
