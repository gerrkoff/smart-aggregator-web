import React, { useEffect, useState } from 'react';
import { FadeInDownSpan } from '@/animations/components';
import { PostFull } from '@components';
import cn from 'classnames';

import styles from './Comments.module.scss';

export const Comments = ({ data }) => {
  const [isCopyVisible, setIsCopyVisible] = useState(false)
  const [post, setPost] = useState(null);

  useEffect(() => {
    setPost(data)
    return () => {
      setPost(null)
    }
  }, [data])

  const handleCopy = () => {
    setIsCopyVisible(true)

    setTimeout(() => {
      setIsCopyVisible(false)
    }, 1500)
  }

  return (
    <div className={styles.comments}>
      <div className={styles.comments__layout} id='comments'>
        <FadeInDownSpan className={cn(styles.copy, isCopyVisible ? styles.show : styles.hide)}>
          Ссылка скопирована
        </FadeInDownSpan>
        {post ? <PostFull post={post} handleCopy={handleCopy}/> : null}
      </div>
    </div>
  )
}
