import { AuthState } from './types';

export const initialState: AuthState = {
  isAuthenticated: false,
  loading: false,
  error: null,
};
