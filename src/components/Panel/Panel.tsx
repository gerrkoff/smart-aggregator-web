import cn from 'clsx';
import { FC, HTMLAttributes, PropsWithChildren } from 'react';

import css from './Panel.module.css';

export const Panel: FC<PropsWithChildren & HTMLAttributes<HTMLDivElement>> = ({ children, className, ...props }) => (
  <div {...props} className={cn(css.container, className)}>
    {children}
  </div>
);
