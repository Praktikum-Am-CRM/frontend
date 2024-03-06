import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';

import {
  AmbassadorsPage,
  CandidatesPage,
  LoginPage,
  MerchPage,
  NotFoundPage,
  NotificationsPage,
  StatisticsPage,
} from './components';

import Layout from '../components/Layout';
import ProtectedRoute from '../components/ProtectedRoute';

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
