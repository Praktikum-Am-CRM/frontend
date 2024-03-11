/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type TabId = 'newMailing';

interface MailingState {
  activeTab: TabId;
  textAreaValue: string;
}

const initialState: MailingState = {
  activeTab: 'newMailing',
  textAreaValue: '',
};

export const mailingSlice = createSlice({
  name: 'mailing',
  initialState,
  reducers: {
    setActiveTab: (state, action: PayloadAction<TabId>) => {
      state.activeTab = action.payload;
    },
    setTextAreaValue: (state, action) => {
      state.textAreaValue = action.payload;
    },
  },
});

export const mailingActions = mailingSlice.actions;
export const mailingReducer = mailingSlice.reducer;
