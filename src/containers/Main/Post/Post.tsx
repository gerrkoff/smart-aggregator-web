import { memo, MouseEventHandler } from 'react';

import { useMessage } from '@/api';
import { PostFull } from '@/components';

export type PostProps = {
  messageId: number;
  onClickCopy: MouseEventHandler;
};

export const Post = memo<PostProps>(function Post({ messageId, onClickCopy }) {
  const { data } = useMessage(messageId);

  return data ? <PostFull handleCopy={onClickCopy} post={data} /> : null;
});
