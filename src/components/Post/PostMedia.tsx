import { memo } from 'react';

import { MediaDto } from '@/api';

import { PostImage } from './PostImage';

type PostMediaProps = {
  media?: MediaDto[] | null;
};

export const PostMedia = memo<PostMediaProps>(function PostMedia({ media }) {
  if (!media?.length) {
    return null;
  }

  const [item] = media;
  const { photoUrl, videoThumbUrl } = item;

  if (!photoUrl && !videoThumbUrl) {
    return null;
  }

  return <PostImage src={(photoUrl || videoThumbUrl) ?? undefined} key={photoUrl || videoThumbUrl} />;
});
