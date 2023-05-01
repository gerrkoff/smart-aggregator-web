import { memo, MouseEventHandler } from 'react';
import { Helmet } from 'react-helmet-async';

import { useMessage } from '@/api';
import { PostFull } from '@/components';

export type PostProps = {
  messageId: number;
  onClickCopy: MouseEventHandler;
};

export const Post = memo<PostProps>(function Post({ messageId, onClickCopy }) {
  const { data } = useMessage(messageId);

  if (!data) {
    return null;
  }

  return (
    <>
      <Helmet>
        <title>{data.title}</title>
        <link href={`${window.location.origin}/message/${data.id}`} rel="canonical" />
      </Helmet>

      <PostFull handleCopy={onClickCopy} post={data} />
    </>
  );
});
