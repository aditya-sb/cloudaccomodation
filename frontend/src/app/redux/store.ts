import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './slices/apiSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // This uses the browser's localStorage
import subscriptionReducer from './slices/subscriptionSlice';

// Configure persist settings
const persistConfig = {
  key: 'root',
  storage, // Use redux-persist's storage
  timeout: 20000, // Timeout for rehydration
  whitelist: ['subscription'], // Persist only the subscription slice
};

// Persist the subscription reducer
const persistedSubscriptionReducer = persistReducer(
  persistConfig,
  subscriptionReducer
);

// Configure the Redux store
export const store = configureStore({
  reducer: {
    // Add the RTK Query reducer and the persisted subscription reducer to the store
    [apiSlice.reducerPath]: apiSlice.reducer,
    subscription: persistedSubscriptionReducer,
  },
  // Adding the api middleware enables caching, invalidation, polling, and other features of RTK Query
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializability checks for redux-persist
    }).concat(apiSlice.middleware),
});

// Persistor for redux-persist
export const persistor = persistStore(store);

// Type exports
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
