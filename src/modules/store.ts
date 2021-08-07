import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { app } from './app';

const store = configureStore({
  middleware: [...getDefaultMiddleware()],
  reducer: app.reducer,
});

type Store = ReturnType<typeof store.getState>;

export { store, Store };
