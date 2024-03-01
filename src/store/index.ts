import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { api } from './amCrm/amCrm.api';
import authReducer from './amCrm/authSlice';
import modalReducer from './amCrm/modalSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  [api.reducerPath]: api.reducer,
  modal: modalReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(api.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
