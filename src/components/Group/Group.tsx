import React, { FC, memo, useEffect, useState } from 'react';
import { useActiveGroupSelector } from '@store/activeGroup';
import Avatar from '@assets/avatar.jpg';
import { TGroup } from '@types';
import cn from 'classnames';
import { Link } from 'react-router-dom';

import styles from './Group.module.scss';
import { THandleGroupClick } from '@/containers/Main/Groups/Groups';
import { AppStore } from '@/store/pullstate';

type TGroupElement = {
  group: TGroup;
  handleClick?: ({ e, group }: THandleGroupClick) => void;
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
        {/* Use another component for preview */}
        {active && link ? (
          <a
            href={link}
            className={styles.group__link}
            target="_blank"
            rel="noreferrer">
            Ссылка на канал
          </a>
        ) : null}
        <p
          className={cn(styles.group__description)}
          dangerouslySetInnerHTML={{ __html: description }}
        />
        {/* <p className={cn(styles.group__description)}>{description}</p> */}
      </div>
    </>
  );
});

export const Group: FC<TGroupElement> = ({ group, handleClick }) => {
  const {selectedChat, selectedChatId} = AppStore.useState(store=>store)
  const { id } = group;
  const { groupId } = useActiveGroupSelector();
  const isActive = selectedChatId === group.id ? true : false

  return (
    <Link
      to={`/${group.id}`}
      className={cn(styles.group, isActive ? styles.active : '')}
      style={{ pointerEvents: isActive ? 'none' : 'all' }}
      data-group-id={id}
      onClick={(e) => {
        if (!handleClick) {
          null;
        } else {
          handleClick({ e, group });
        }
      }}
    >
      <Body group={group} active={isActive} />
    </Link>
  );
};
