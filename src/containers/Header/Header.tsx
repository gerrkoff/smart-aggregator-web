import React from 'react';
import Logo from '@assets/logo.png';

import styles from './Header.module.scss';

const HEADER_LINKS = [
  {
    name: 'О сервисе',
    href: '#'
  },
  {
    name: 'Бот',
    href: '#'
  },
  {
    name: 'Реклама',
    href: '#'
  }
]

const LOGO_HREF = '#'
const AUTH_HREF = '#'

export const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles.header_wrapper}>
        <a className={styles.header_logo} href={LOGO_HREF}>
          <img src={Logo} alt='Logo'/>
        </a>
        <div className={styles.header_links}>
          {HEADER_LINKS.map((link) => <a className={styles.link} href={link.href} target='_blank' key={link.name}>{link.name}</a>)}
          <a href={AUTH_HREF} className={styles.auth}>Авторизация</a>
        </div>
      </div>
    </div>
  )
}
