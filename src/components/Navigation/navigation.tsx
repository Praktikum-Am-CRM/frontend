import { Text } from '@gravity-ui/uikit';
import { NavLink } from 'react-router-dom';
import styles from './navigation.module.css';

export default function Navigation() {
  const data = [
    { title: 'Амбассодоры', url: 'ambassodors' },
    { title: 'Кандидаты', url: 'candidates' },
    { title: 'Статистика', url: 'statistics' },
    { title: 'Уведомления', url: 'notifications' },
    { title: 'Мерч', url: 'merch' },
  ];

  return (
    <>
      <nav className={styles.nav}>
        {data.map((el, index) => (
          <NavLink
            key={index}
            to={el.url}
            className={({ isActive }) => {
              return `${styles.nav__link} ${isActive && `${styles.nav__link_active}`}`;
            }}
          >
            <Text>{el.title}</Text>
          </NavLink>
        ))}
      </nav>
    </>
  );
}
