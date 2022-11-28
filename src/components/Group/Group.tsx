import React, { FC, memo, useEffect, useState } from 'react';
import { useActiveGroupSelector } from '@store/activeGroup';
import Avatar from '@assets/avatar.jpg';
import { TGroup } from '@types';
import cn from 'classnames';

import styles from './Group.module.scss';

type TGroupElement = {
  group: TGroup,
  handleClick?: (e: any) => any,
}

type TBodyElement = {
  group: TGroup,
  active: boolean,
  handleClick?: (e: any) => any,
}

const Body: FC<TBodyElement> = memo(({ group, active }) => {
  const { title, description, logoUrl, link } = group;

  const LinkElement = ({ src }) => (
    <a href={src} className={styles.group__link} target="_blank">Ссылка на канал</a>
  )
  const Image = () => <img src={logoUrl ? logoUrl : Avatar} alt='placeholder' loading="lazy"/>;
  const Link = () => active && link ? <LinkElement src={link}/> : null;

  return (
    <>
      <div className={styles.group__logo}>
        <Image/>
      </div>
      <div className={styles.group__text_wrapper}>
        <span className={styles.group__title}>{title}</span>
        <Link/>
        <p className={cn(styles.group__description)}>{description}</p>
      </div>
    </>
  )
})

export const Group: FC<TGroupElement> = ({ group, handleClick }) => {
  const [active, setActive] = useState(false);
  const { id } = group;
  const { groupId } = useActiveGroupSelector();

  useEffect(() => {
    setActive(String(groupId) === String(id))
  }, [groupId])

  return (
    <div className={cn(styles.group, active ? styles.active : '')}
         data-group-id={id}
         onClick={handleClick}>
      <Body group={group} active={active}/>
    </div>
  )
}
