/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isModalOpen: false,
  contentType: '',
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: state => {
      state.isModalOpen = true;
    },
    closeModal: state => {
      state.isModalOpen = false;
    },
    setModalContentType: (state, action) => {
      state.contentType = action.payload;
    },
  },
});

export const { openModal, closeModal, setModalContentType } =
  modalSlice.actions;
export default modalSlice.reducer;
