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

import OnboardingFormMini from '../components/OnboardingFormMini';
import OnboardingFormFull from '../components/OnboardingFormFull';

import Layout from '../components/Layout';
import ProtectedRoute from '../components/ProtectedRoute';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />} errorElement={<NotFoundPage />}>
        <Route element={<ProtectedRoute />}>
          <Route path="ambassadors" element={<AmbassadorsPage />} />
          <Route path="candidates" element={<CandidatesPage />} />
          <Route path="notifications" element={<NotificationsPage />} />
          <Route path="statistics" element={<StatisticsPage />} />
          <Route path="merch" element={<MerchPage />} />
        </Route>
      </Route>
      <Route path="login" element={<LoginPage />} />
      <Route path="onboarding-mini" element={<OnboardingFormMini />} />
      <Route path="onboarding-full" element={<OnboardingFormFull />} />
      <Route path="*" element={<NotFoundPage />} />
    </>,
  ),
  {
    basename: '/',
  },
);

export default router;
