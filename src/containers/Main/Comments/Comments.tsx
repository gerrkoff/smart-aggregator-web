import React, { useState } from 'react';
import { FadeInDownSpan } from '@/animations/components';
import { PostFull } from '@components';

import styles from './Comments.module.scss';

export const Comments = ({ data }) => {
  const [isCopyVisible, setIsCopyVisible] = useState(false)

  const handleCopy = () => {
    setIsCopyVisible(true)

    setTimeout(() => {
      setIsCopyVisible(false)
    }, 1500)
  }

  const postToFullMessageElement = () => {
    return data ? <PostFull post={data} handleCopy={handleCopy}/> : null;
  }

  return (
    <div className={styles.comments}>
      <div className={styles.comments__layout} id='comments'>
        <FadeInDownSpan className={styles.copy} style={{ display: `${isCopyVisible ? 'inline' : 'none'}` }}>
          Ссылка скопирована
        </FadeInDownSpan>
        {postToFullMessageElement()}
      </div>
    </div>
  )
}
