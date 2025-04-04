export interface AuthState {
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}
export interface RegisterData {
  username: string;
  password: string;
}
