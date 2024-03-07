/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

interface TableState {
  pickedRowUserId: string;
  selectedUsersIds: string[];
}

const initialState: TableState = {
  pickedRowUserId: '',
  selectedUsersIds: [],
};

export const tableSlice = createSlice({
  name: 'row',
  initialState,
  reducers: {
    setPickedRowUserId: (state, action) => {
      state.pickedRowUserId = action.payload;
    },
    setSelectedUsersIds: (state, action) => {
      state.selectedUsersIds = action.payload;
    },
  },
});

export const tableActions = tableSlice.actions;
export const tableReducer = tableSlice.reducer;
