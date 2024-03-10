import { Text } from '@gravity-ui/uikit';
import { NavLink } from 'react-router-dom';
import styles from './styles.module.css';
import { useActions } from '../../hooks/actions';

const links = [
  { title: 'Амбассадоры', url: 'ambassadors' },
  { title: 'Кандидаты', url: 'candidates' },
  { title: 'Статистика', url: 'statistics' },
  { title: 'Отчеты', url: 'notifications' },
  { title: 'Мерч', url: 'merch' },
];

export default function Navigation() {
  const { closeModal } = useActions();

  return (
    <>
      <nav className={styles.nav}>
        {links.map((el, index) => (
          <NavLink
            onClick={() => closeModal()}
            key={index}
            to={el.url}
            className={({ isActive }) =>
              `${styles.nav__link} ${isActive && styles.nav__link_active}`
            }
          >
            <Text>{el.title}</Text>
          </NavLink>
        ))}
      </nav>
    </>
  );
}
