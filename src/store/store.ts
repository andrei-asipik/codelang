import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@store/authSlice';
import userReducer from '@store/userSlice';
import snippetReducer from '@store/snippetSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    snippets: snippetReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
