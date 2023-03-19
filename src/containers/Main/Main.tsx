import cn from 'clsx';
import { FC } from 'react';
import { useParams } from 'react-router-dom';

import { Comments } from './Comments';
import { Groups } from './Groups';
import { Posts } from './Posts';

import styles from './Main.module.scss';

export const Main: FC = () => {
  const { messageId } = useParams();

  return (
    <div className={cn(styles.main, messageId && styles.wide)}>
      <Groups noPreview={!!messageId} />
      <Posts />
      <Comments />
    </div>
  );
};
