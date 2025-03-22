import { api } from './api';

export const getSnippets = async (page: number = 1) => {
  try {
    const response = await api.get(`/snippets?limit=10&page=${page}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
