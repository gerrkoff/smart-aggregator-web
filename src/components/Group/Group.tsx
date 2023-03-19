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
};

export const Group = memo<GroupProps>(function Group({ group, selected, showExternalLink }) {
  const { description, id, link, logoUrl, title } = group;

  const body = (
    <>
      <div className={styles.logo}>
        <img src={logoUrl || Avatar} alt="placeholder" loading="lazy" />
      </div>

      <div className={styles.wrapper}>
        <span className={styles.title}>{title}</span>

        {link && showExternalLink ? (
          <a href={link} className={styles.href} target="_blank" rel="noreferrer">
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
      to={`/${id}`}
      className={({ isActive }) =>
        cn({
          [styles.group]: true,
          [styles.link]: true,
          [styles.active]: selected || isActive,
        })
      }
    >
      {body}
    </NavLink>
  );
});
