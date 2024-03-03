import { useDispatch } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';
import { authActions } from '../store/amCrm/auth.slice';
import { modalActions } from '../store/amCrm/modal.slice';
import { tableActions } from '../store/amCrm/table.slice';

// import { userActions } from '../store/amCrm/user.slice';

const actions = {
  ...authActions,
  ...modalActions,
  ...tableActions,
};

export const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(actions, dispatch);
};
