import { lazy } from 'react';
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';

import Layout from '../components/Layout';
import ProtectedRoute from '../components/ProtectedRoute';

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
      <Route element={<ProtectedRoute />}>
        <Route path="ambassadors" element={<AmbassadorsPage />} />
        <Route path="candidates" element={<CandidatesPage />} />
        <Route path="notifications" element={<NotificationsPage />} />
        <Route path="statistics" element={<StatisticsPage />} />
        <Route path="merch" element={<MerchPage />} />
      </Route>
      <Route path="login" element={<LoginPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Route>,
  ),
  {
    basename: '/',
  },
);

export default router;
