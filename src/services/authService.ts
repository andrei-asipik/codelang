import { api } from './api';

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

export const loginUser = async (userData: RegisterData) => {
  try {
    await api.post('/auth/login', userData);
    console.log('Успешный вход!');
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const logoutUser = async () => {
  try {
    await api.post('/auth/logout', {});
    console.log('Успешный выход!');
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
