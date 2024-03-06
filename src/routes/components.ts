import { lazy } from 'react';

const AmbassadorsPage = lazy(() => import('../pages/AmbassadorsPage'));
const CandidatesPage = lazy(() => import('../pages/CandidatesPage'));
const MerchPage = lazy(() => import('../pages/MerchPage'));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage'));
const NotificationsPage = lazy(() => import('../pages/NotificationsPage'));
const StatisticsPage = lazy(() => import('../pages/StatisticsPage'));
const LoginPage = lazy(() => import('../pages/LoginPage'));

export {
  AmbassadorsPage,
  CandidatesPage,
  MerchPage,
  NotFoundPage,
  NotificationsPage,
  StatisticsPage,
  LoginPage,
};
