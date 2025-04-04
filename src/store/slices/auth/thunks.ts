import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '@services';
import { RegisterData } from './types';
import { clearUser, setUser } from '@store';

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
