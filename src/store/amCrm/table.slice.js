/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  rowId: '',
};

export const tableSlice = createSlice({
  name: 'row',
  initialState,
  reducers: {
    setRowId: (state, action) => {
      state.rowId = action.payload;
    },
  },
});

export const tableActions = tableSlice.actions;
export const tableReducer = tableSlice.reducer;
