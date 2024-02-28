import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Header from '../Header';
import ScrollToTop from '../../utils/ScrollToTop';
import styles from './styles.module.css';
import { Suspense, useEffect } from 'react';
import { Loader } from '@gravity-ui/uikit';

export default function Layout() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === '/') {
      navigate('/ambassadors');
    }
  }, [location]);

  return (
    <ScrollToTop>
      <div className={styles.layout}>
        <Header />
        <main className={styles.layout__main}>
          <Suspense fallback={<Loader size="l" />}>
            <Outlet />
          </Suspense>
        </main>
      </div>
    </ScrollToTop>
  );
}
