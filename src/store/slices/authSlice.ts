import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { clearUser, setUser } from '@store';
import { api } from '@services';

interface AuthState {
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}
export interface RegisterData {
  username: string;
  password: string;
}

const initialState: AuthState = {
  isAuthenticated: false,
  loading: false,
  error: null,
};

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (authData: { username: string; password: string }, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.post('/auth/login', authData);
      dispatch(setUser(response.data.data));
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Authorization error');
    }
  }
);

export const logoutUser = createAsyncThunk('auth/logoutUser', async (_, { dispatch }) => {
  await api.post('/auth/logout', {});
  dispatch(clearUser());
});

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (registerData: RegisterData, { dispatch, rejectWithValue }) => {
    try {
      await api.post('/register', registerData);
      const loginResponse = await dispatch(
        loginUser({ username: registerData.username, password: registerData.password })
      ).unwrap();
      return loginResponse;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Registration error');
    }
  }
);

export const checkAuth = createAsyncThunk(
  'auth/checkAuth',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.get('/auth');
      dispatch(setUser(response.data.data));
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Not authenticated');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //loginUser
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state) => {
        state.loading = false;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || action.error.message || 'Authorization error';
      })
      //logoutUser
      .addCase(logoutUser.fulfilled, (state) => {
        state.isAuthenticated = false;
      })
      //registerUser
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        state.isAuthenticated = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || action.error.message || 'Registration error';
      })
      // checkAuth
      .addCase(checkAuth.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkAuth.fulfilled, (state) => {
        state.loading = false;
        state.isAuthenticated = true;
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.error = (action.payload as string) || action.error.message || 'Not authenticated';
      });
  },
});

export default authSlice.reducer;
