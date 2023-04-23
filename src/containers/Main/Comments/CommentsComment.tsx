import { memo } from 'react';
import { useParams } from 'react-router-dom';

import { Post, PostProps } from '../Post';

export type CommentsCommentProps = Pick<PostProps, 'onClickCopy'>;

export const CommentsComment = memo<CommentsCommentProps>(function CommentsComment({ onClickCopy }) {
  const { messageId } = useParams();
  if (!messageId) {
    return null;
  }

  const id = Number(messageId);
  if (Number.isNaN(id)) {
    return null;
  }

  return <Post messageId={id} onClickCopy={onClickCopy} />;
});
