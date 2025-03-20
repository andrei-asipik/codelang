import { api } from './api';
import { AppDispatch } from 'src/store/store';
import { login, logout } from '@store/authSlice';
import { clearUser, setUser } from '@store/userSlice';

export interface RegisterData {
  username?: string;
  password?: string;
}

export const registerUser = async (userData: RegisterData) => {
  try {
    const response = await api.post('register', userData);

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const loginUser = async (userData: RegisterData, dispatch: AppDispatch) => {
  try {
    const response = await api.post('/auth/login', userData);
    dispatch(login());
    dispatch(setUser(response.data.data));
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const logoutUser = async (dispatch: AppDispatch) => {
  try {
    await api.post('/auth/logout', {});
    dispatch(logout());
    dispatch(clearUser());
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
