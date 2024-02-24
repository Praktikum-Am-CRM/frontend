import { Outlet, useLocation } from 'react-router-dom';

import Header from '../Header';

import ScrollToTop from '../../utils/ScrollToTop';

export default function Layout() {
  const location = useLocation();

  const isLoginPage = location.pathname === '/login';

  return (
    <ScrollToTop>
      <div>
        {!isLoginPage && <Header />}
        <main>
          <Outlet />
        </main>
      </div>
    </ScrollToTop>
  );
}
