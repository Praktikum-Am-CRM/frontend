import { useDispatch } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';
import { setLoggedIn } from '../store/amCrm/authSlice';
import {
  closeModal,
  openModal,
  setModalContentType,
} from '../store/amCrm/modalSlice';

// import { userActions } from '../store/amCrm/user.slice';

const actions = {
  setLoggedIn,
  closeModal,
  openModal,
  setModalContentType,
};

export const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(actions, dispatch);
};
