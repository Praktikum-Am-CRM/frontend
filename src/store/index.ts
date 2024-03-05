import { configureStore } from '@reduxjs/toolkit';
import { api } from './amCrm/amCrm.api';
import { authReducer } from './amCrm/auth.slice';
import { modalReducer } from './amCrm/modal.slice';
import { tableReducer } from './amCrm/table.slice';
import { mailingReducer } from './amCrm/mailing.slice';

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth: authReducer,
    modal: modalReducer,
    table: tableReducer,
    mailing: mailingReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(api.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
