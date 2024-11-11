// src/app/features/authModalSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthModalState {
  isOpen: boolean;
  activeModal: 'login' | 'signup' | null;
}

const initialState: AuthModalState = {
  isOpen: false,
  activeModal: null,
};

const authModalSlice = createSlice({
  name: 'authModal',
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<'login' | 'signup'>) => {
      state.isOpen = true;
      state.activeModal = action.payload;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.activeModal = null;
    },
  },
});

export const { openModal, closeModal } = authModalSlice.actions;
export default authModalSlice.reducer;
