/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-param-reassign */

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { authService } from '../../services/authService';

interface AuthState {
  user: any;
  isLoading: boolean;
  error: string | null | unknown;
}

const initialState: AuthState = {
  user: null,
  isLoading: false,
  error: null,
};

export const login = createAsyncThunk(
  'auth/login',
  async (data: { email: string; password: string }, thunkAPI) => {
    try {
      const response = await authService.login(data.email, data.password);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(login.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.user = action.payload.user;
      localStorage.setItem('token', action.payload.token);
      state.isLoading = false;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    });
  },
});

export default authSlice.reducer;
