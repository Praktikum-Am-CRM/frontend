import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';

import * as page from '../pages';
import Layout from '../components/Layout';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<page.NotFoundPage />}>
      <Route path="ambassadors" element={<page.AmbassadorsPage />} />
      <Route path="candidates" element={<page.CandidatesPage />} />
      <Route path="notifications" element={<page.NotificationsPage />} />
      <Route path="statistics" element={<page.StatisticsPage />} />
      <Route path="merch" element={<page.MerchPage />} />
      <Route path="*" element={<page.NotFoundPage />} />
    </Route>,
  ),
  {
    basename: '/',
  },
);

export default router;
