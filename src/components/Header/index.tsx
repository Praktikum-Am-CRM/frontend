import { Link } from 'react-router-dom';
import { Logo } from '../../assets/icons';
import Navigation from '../Navigation';
import Profile from '../Profile';
import styles from './styles.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        <Link className={styles.header__link} to="/">
          <Logo width={168} />
        </Link>
        <Navigation />
        <Profile />
      </div>
    </header>
  );
}
