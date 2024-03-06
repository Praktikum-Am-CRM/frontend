/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  rowId: '',
  selectedUsersIds: [],
};

export const tableSlice = createSlice({
  name: 'row',
  initialState,
  reducers: {
    setClickedRowId: (state, action) => {
      state.rowId = action.payload;
    },
    setSelectedUsersIds: (state, action) => {
      state.selectedUsersIds = action.payload;
    },
  },
});

export const tableActions = tableSlice.actions;
export const tableReducer = tableSlice.reducer;
