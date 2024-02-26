import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import ScrollToTop from '../../utils/ScrollToTop';
import styles from './layout.module.css';

export default function Layout() {
  return (
    <ScrollToTop>
      <div className={styles.root}>
        <Header />
        <main>
          <Outlet />
        </main>
      </div>
    </ScrollToTop>
  );
}
