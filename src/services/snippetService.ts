import { Mark } from '@molecules/Snippet/Snippet';
import { api } from './api';

export const getSnippets = async (page: number = 1) => {
  try {
    const response = await api.get(`/snippets?limit=10&page=${page}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const getSnippetById = async (id: string) => {
  try {
    const response = await api.get(`/snippets/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const addSnippetsMark = async (id: string, mark: Mark['type']) => {
  try {
    const response = await api.post(`/snippets/${id}/mark`, { mark: mark });
    console.log(response.data);
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
