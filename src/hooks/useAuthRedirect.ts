import { useEffect } from 'react';
import { useAppSelector } from './redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../store';

export function useAuthRedirect() {
  const navigate = useNavigate();
  const isLoggedIn = useAppSelector(
    (state: RootState) => state.auth.isLoggedIn,
  );

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);
}
