import React, { FC, memo, useEffect, useState } from 'react';
import { useActivePostSelector } from '@store/activePost';
import { toDateFormat } from '@utils/utils';
import { TPost } from '@types';
import cn from 'classnames';

import styles from './Post.module.scss';

type TPostElement = {
  post: TPost,
  handleClick?: (e: any) => void | undefined,
}

const Image = ({ src }) => (<img src={src} width={100} height={100} loading="lazy"/>);

export const Post: FC<TPostElement> = memo(({ post, handleClick }) => {
  const [active, setActive] = useState(false);
  const { text, createTime, messageId, chatId, media } = post;
  const { postId } = useActivePostSelector();

  useEffect(() => {
    setActive(String(messageId) === String(postId))
  }, [postId])

  const mediaComponent = () => {
    if (media.length > 0) {
      const item = media[0]
      const { photoUrl, videoThumbUrl } = item
      return photoUrl || videoThumbUrl ?
        <Image src={photoUrl || videoThumbUrl} key={photoUrl || videoThumbUrl}/> : null;
    }
    return null
  }

  return (
    <div className={cn(styles.post, active ? styles.active : '')}
         data-post-id={messageId}
         data-group-id={chatId}
         onClick={handleClick}>
      <div className={styles.post__info}>
        {mediaComponent()}
        <div className={styles.text__wrapper}>
          <p className={styles.post__text} dangerouslySetInnerHTML={{ __html: text.replace('<br />', '') }}/>
          <span className={styles.post__data}>{toDateFormat(createTime)}</span>
        </div>
      </div>
    </div>
  )
})
