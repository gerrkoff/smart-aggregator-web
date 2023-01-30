import React, { FC, memo, useEffect, useState } from 'react';
import { useActiveGroupSelector } from '@store/activeGroup';
import Avatar from '@assets/avatar.jpg';
import { TGroup } from '@types';
import cn from 'classnames';

import styles from './Group.module.scss';

type TGroupElement = {
  group: TGroup;
  handleClick?: (e: any) => any;
};

type TBodyElement = {
  group: TGroup;
  active: boolean;
  handleClick?: (e: any) => any;
};

const Body: FC<TBodyElement> = memo(({ group, active }) => {
  const { title, description, logoUrl, link } = group;

  return (
    <>
      <div className={styles.group__logo}>
        <img src={logoUrl || Avatar} alt="placeholder" loading="lazy" />
      </div>
      <div className={styles.group__text_wrapper}>
        <span className={styles.group__title}>{title}</span>
        {active && link ? (
          <a
            href={link}
            className={styles.group__link}
            target="_blank"
            rel="noreferrer"
          >
            Ссылка на канал
          </a>
        ) : null}
        <p className={cn(styles.group__description)}>{description}</p>
      </div>
    </>
  );
});

export const Group: FC<TGroupElement> = ({ group, handleClick }) => {
  const [active, setActive] = useState(false);
  const { id } = group;
  const { groupId } = useActiveGroupSelector();

  useEffect(() => {
    setActive(String(groupId) === String(id));
  }, [groupId]);

  return (
    <div
      className={cn(styles.group, active ? styles.active : '')}
      data-group-id={id}
      onClick={handleClick}
    >
      <Body group={group} active={active} />
    </div>
  );
};
