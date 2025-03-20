import { setUser } from '@store/userSlice';
import { api } from './api';
import { AppDispatch } from '@store/store';

export interface RegisterData {
  username?: string;
  password?: string;
}
export interface Password {
  oldPassword?: string;
  newPassword?: string;
}
export interface UserData {
  id: number;
  username: string;
  role: 'user' | 'admin';
}

export const updateName = async (data: RegisterData) => {
  try {
    await api.patch('/me', data);
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const updatePassword = async (data: Password) => {
  try {
    await api.patch('/me/password', data);
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const getUser = async () => {
  try {
    const response = await api.get('/me');
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const deleteUser = async () => {
  try {
    await api.delete('/me');
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const getUserStatistic = async (dispatch: AppDispatch, id: number) => {
  try {
    const response = await api.get(`/users/${id}/statistic`);

    dispatch(setUser(response.data.data));
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
