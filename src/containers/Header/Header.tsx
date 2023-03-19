import styles from './Header.module.scss';

import Logo from '@/assets/logo.png';

const HEADER_LINKS = [
  {
    href: 'http://echochatpress.tilda.ws/',
    name: 'О сервисе',
  },
  {
    href: 'http://echochatpress.tilda.ws/page31379566.html#bot',
    name: 'Бот',
  },
  {
    href: 'http://echochatpress.tilda.ws/page31379566.html',
    name: 'Реклама',
  },
];

const LOGO_HREF = '/';

export const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles.header_wrapper}>
        <a className={styles.header_logo} href={LOGO_HREF}>
          <img src={Logo} alt="Logo" />
        </a>

        <div className={styles.header_links}>
          {HEADER_LINKS.map((link) => (
            <a className={styles.link} href={link.href} target="_blank" key={link.name} rel="noreferrer">
              {link.name}
            </a>
          ))}
          {/* <a href={AUTH_HREF} className={styles.auth}>Авторизация</a> */}
        </div>
      </div>
    </div>
  );
};
