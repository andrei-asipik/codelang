import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@store/authSlice';
import userReducer from '@store/userSlice';
import snippetReducer from '@store/snippetSlice';
import questionReducer from '@store/questionSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    snippets: snippetReducer,
    questions: questionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
