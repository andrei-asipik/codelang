import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/auth/slice';
import userReducer from './slices/user/slice';
import snippetReducer from './slices/snippets/slice';
import questionReducer from './slices/questions/slice';

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
