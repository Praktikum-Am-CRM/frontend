import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Header from '../Header';
import ScrollToTop from '../../utils/ScrollToTop';
import styles from './styles.module.css';
import { Suspense, useEffect } from 'react';
import { Loader } from '@gravity-ui/uikit';

export default function Layout() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === '/') {
      navigate('/ambassadors');
    }
  }, [location, navigate]);

  return (
    <ScrollToTop>
      <div className={styles.layout}>
        {!isLoginPage && <Header />}
        <main className={styles.layout__main}>
          <Suspense fallback={<Loader size="l" />}>
            <Outlet />
          </Suspense>
        </main>
      </div>
    </ScrollToTop>
  );
}
