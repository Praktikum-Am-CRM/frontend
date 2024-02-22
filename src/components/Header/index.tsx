import Navigation from '../Navigation';
import styles from './styles.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <div>Logo</div>
      <Navigation />
      <div>Профиль</div>
    </header>
  );
}
