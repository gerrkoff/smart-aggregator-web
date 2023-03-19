import { FC, ImgHTMLAttributes } from 'react';

export type PostImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, 'height' | 'width'>;

export const PostImage: FC<PostImageProps> = (props) => (
  <img alt="" loading="lazy" {...props} width={100} height={100} />
);
