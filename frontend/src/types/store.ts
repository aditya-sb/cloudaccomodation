// src/app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import authModalReducer from './authModalSlice';

export const store = configureStore({
  reducer: {
    authModal: authModalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
