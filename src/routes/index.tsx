import { lazy } from 'react';
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';

import Layout from '../components/Layout';

const AmbassadorsPage = lazy(() => import('../pages/AmbassadorsPage'));
const CandidatesPage = lazy(() => import('../pages/CandidatesPage'));
const MerchPage = lazy(() => import('../pages/MerchPage'));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage'));
const NotificationsPage = lazy(() => import('../pages/NotificationsPage'));
const StatisticsPage = lazy(() => import('../pages/StatisticsPage'));
const LoginPage = lazy(() => import('../pages/LoginPage'));

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<NotFoundPage />}>
      <Route path="ambassadors" element={<AmbassadorsPage />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="candidates" element={<CandidatesPage />} />
      <Route path="notifications" element={<NotificationsPage />} />
      <Route path="statistics" element={<StatisticsPage />} />
      <Route path="merch" element={<MerchPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Route>,
  ),
  {
    basename: '/',
  },
);

export default router;
