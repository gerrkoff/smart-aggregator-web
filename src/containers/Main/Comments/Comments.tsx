import React, { useEffect, useState } from 'react';
import { PostFull } from '@components';
import cn from 'classnames';
import { FadeInDownSpan } from '@/animations/components';

import styles from './Comments.module.scss';
import { AppStore } from '@/store/pullstate';

export const Comments = ({ data }) => {
  const { selectedFeed } = AppStore.useState((store) => store);
  const [isCopyVisible, setIsCopyVisible] = useState(false);
  const [post, setPost] = useState(null);

  useEffect(() => {
    setPost(data);
    return () => {
      setPost(null);
    };
  }, [data]);

  const handleCopy = () => {
    setIsCopyVisible(true);

    setTimeout(() => {
      setIsCopyVisible(false);
    }, 1500);
  };

  return (
    <div className={styles.comments}>
      <div className={styles.comments__layout} id="comments">
        <FadeInDownSpan
          className={cn(styles.copy, isCopyVisible ? styles.show : styles.hide)}
        >
          Ссылка скопирована
        </FadeInDownSpan>
        {selectedFeed ? <PostFull post={selectedFeed} handleCopy={handleCopy} /> : null}
      </div>
    </div>
  );
};
