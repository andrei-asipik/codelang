import axios from 'axios';

export interface RegisterData {
  username?: string;
  password?: string;
}

const BASE_URL = 'https://codelang.vercel.app/api/';

export const registerUser = async (userData: RegisterData) => {
  console.log(userData);
  try {
    const url = BASE_URL + 'register';
    const response = await axios.post(url, userData);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

// export const loginUser = async (username, password) => {
// };

// export const logoutUser = () => {
//   localStorage.removeItem('token');
// };
