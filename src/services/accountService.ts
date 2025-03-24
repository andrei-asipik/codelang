import { api } from './api';

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
