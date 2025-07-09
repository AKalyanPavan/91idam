import { configureStore } from '@reduxjs/toolkit';
import propertyReducer from './slices/propertySlice';
import uiReducer from './slices/uiSlice';
import userReducer from './slices/userSlice';

export const store = configureStore({
  reducer: {
    property: propertyReducer,
    ui: uiReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['property/setImages'],
        ignoredActionPaths: ['payload.images', 'payload.timestamp'],
        ignoredPaths: ['property.images', 'user.preferences.recentlyViewed'],
      },
    }),
  devTools: process.env.NODE_ENV !== 'production',
});