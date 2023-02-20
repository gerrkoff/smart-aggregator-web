import React from 'react'
import cn from 'classnames';

const LoadingItem = ({type='chat'}:{type?: 'chat' | 'feed'}) => {
  return (
    <div className={cn('skeleton loading-item loading-item_chat', type === 'chat' ? 'loading-item_chat' : type === 'feed' ? 'loading-item_feed' : 'loading-item_chat')}></div>
  )
}

export {LoadingItem}