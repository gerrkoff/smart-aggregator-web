import cn from 'clsx';
import { memo } from 'react';
import { NavLink } from 'react-router-dom';

import { ChatDto } from '@/api';
import Avatar from '@/assets/avatar.jpg';

import styles from './Group.module.css';

type GroupProps = {
  group: ChatDto;
  selected?: boolean;
  showExternalLink?: boolean;
  url: string;
};

export const Group = memo<GroupProps>(function Group({ group, selected, showExternalLink, url }) {
  const { description, link, logoUrl, title } = group;

  const body = (
    <>
      <div className={styles.logo}>
        <img alt="placeholder" loading="lazy" src={logoUrl || Avatar} />
      </div>

      <div className={styles.wrapper}>
        <span className={styles.title}>{title}</span>

        {link && showExternalLink ? (
          <a className={styles.href} href={link} rel="noreferrer" target="_blank">
            Ссылка на канал
          </a>
        ) : null}

        <p
          className={cn(styles.description)}
          dangerouslySetInnerHTML={{ __html: description ?? '' }} // eslint-disable-line react/no-danger
        />
        {/* <p className={cn(styles.description)}>{description}</p> */}
      </div>
    </>
  );

  if (showExternalLink) {
    return <div className={cn(styles.group, styles.info)}>{body}</div>;
  }

  return (
    <NavLink
      className={({ isActive }) =>
        cn({
          [styles.group]: true,
          [styles.link]: true,
          [styles.active]: selected || isActive,
        })
      }
      to={url}
    >
      {body}
    </NavLink>
  );
});
