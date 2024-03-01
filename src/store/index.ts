import { configureStore } from '@reduxjs/toolkit';
import { api } from './amCrm/amCrm.api';
import { authReducer } from './amCrm/auth.slice';

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth: authReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(api.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
