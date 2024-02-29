import { useAppSelector } from '../../hooks/redux';
import { Navigate, Outlet } from 'react-router-dom';
import { RootState } from '../../store';

const ProtectedRoute = () => {
  const isLoggedIn = useAppSelector(
    (state: RootState) => state.auth.isLoggedIn,
  );

  return isLoggedIn ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
