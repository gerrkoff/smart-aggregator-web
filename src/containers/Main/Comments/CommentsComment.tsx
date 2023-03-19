import { memo, MouseEventHandler, useEffect, useState } from 'react';

import { PostFull } from '@/components';
import { useSelectedMessage } from '@/hooks';

export type CommentsCommentProps = { onClickCopy: MouseEventHandler };

export const CommentsComment = memo<CommentsCommentProps>(function CommentsComment({ onClickCopy }) {
  const selected = useSelectedMessage();
  const [message, setMessage] = useState(selected);

  useEffect(() => {
    if (selected) {
      setMessage(selected);
    }
  }, [selected]);

  return message ? <PostFull handleCopy={onClickCopy} post={message} /> : null;
});
