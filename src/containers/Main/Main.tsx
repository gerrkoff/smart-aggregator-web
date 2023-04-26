import { FC } from 'react';

import { Comments } from './Comments';
import { Groups } from './Groups';
import { Posts } from './Posts';

import styles from './Main.module.scss';

export const Main: FC = () => {
  // const { messageId } = useParams();

  return (
    // <div className={cn(styles.main, messageId && styles.wide)}>
    <div className={styles.main}>
      {/* <Groups noPreview={!!messageId} /> */}
      <Groups />
      <Posts />
      <Comments />
    </div>
  );
};
