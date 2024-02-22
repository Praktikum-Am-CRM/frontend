import { Outlet } from 'react-router-dom';

import Header from '../Header';

import ScrollToTop from '../../utils/ScrollToTop';

export default function Layout() {
  return (
    <ScrollToTop>
      <div>
        <Header />
        <main>
          <Outlet />
        </main>
      </div>
    </ScrollToTop>
  );
}
