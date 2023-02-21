import React from 'react';
import cn from 'classnames';

export const LoadingItem = ({ type = 'chat' }: { type?: 'chat' | 'feed' }) => {
  let edditionClass = '';
  switch (type) {
    case 'chat':
      edditionClass = 'loading-item_chat';
      break;
    case 'feed':
      edditionClass = 'loading-item_feed';
      break;
    default:
      break;
  }
  return (
    <div
      className={cn('skeleton loading-item loading-item_chat', edditionClass)}
    />
  );
};
