import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '@services';
import { UpdateNameData, UpdatePasswordData } from './types';

export const fetchUserStatistic = createAsyncThunk(
  'user/fetchUserStatistic',
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await api.get(`/users/${id}/statistic`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to load user statistics');
    }
  }
);

export const updateUserName = createAsyncThunk(
  'user/updateUserName',
  async (data: UpdateNameData, { rejectWithValue }) => {
    try {
      const response = await api.patch('/me', data);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to change name');
    }
  }
);

export const updatePassword = createAsyncThunk(
  'user/updatePassword',
  async (data: UpdatePasswordData, { rejectWithValue }) => {
    try {
      await api.patch('/me/password', data);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to change password');
    }
  }
);

export const deleteUser = createAsyncThunk('user/deleteUser', async (_, { rejectWithValue }) => {
  try {
    await api.delete('/me');
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to delete user');
  }
});

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async ({ page }: { page: number }, { rejectWithValue }) => {
    try {
      const response = await api.get(`/users?limit=20&page=${page}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Something went wrong');
    }
  }
);
export const fetchUserStatisticById = createAsyncThunk(
  'user/fetchUserStatisticById',
  async (userId: number, { rejectWithValue }) => {
    try {
      const response = await api.get(`/users/${userId}/statistic`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to load user statistics');
    }
  }
);
