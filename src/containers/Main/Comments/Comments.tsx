import cn from 'clsx';
import { useParams } from 'react-router-dom';

import { FadeInDownSpan } from '@/animations/components';
import { Panel } from '@/components';

import { CommentsComment } from './CommentsComment';
import { useCopyLink } from './useCopyLink';

import styles from './Comments.module.scss';

export const Comments = () => {
  const { messageId } = useParams();
  const [isCopyVisible, handleCopy] = useCopyLink();

  return (
    <Panel className={styles.comments}>
      <div className={styles.comments__layout} id="comments">
        <FadeInDownSpan className={cn(styles.copy, isCopyVisible ? styles.show : styles.hide)}>
          Ссылка скопирована
        </FadeInDownSpan>

        {messageId ? <CommentsComment onClickCopy={handleCopy} /> : null}
      </div>
    </Panel>
  );
};
