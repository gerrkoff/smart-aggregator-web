import { memo, MouseEventHandler } from 'react';

import { PostFull } from '@/components';
import { useSelectedMessage } from '@/hooks';

export type CommentsCommentProps = { onClickCopy: MouseEventHandler };

export const CommentsComment = memo<CommentsCommentProps>(function CommentsComment({ onClickCopy }) {
  const selected = useSelectedMessage();

  return selected ? <PostFull post={selected} handleCopy={onClickCopy} /> : null;
});
