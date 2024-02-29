import { useDispatch } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';
import { setLoggedIn } from '../store/amCrm/authSlice';

// import { userActions } from '../store/amCrm/user.slice';

const actions = {
  setLoggedIn,
};

export const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(actions, dispatch);
};
