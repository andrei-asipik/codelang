import { api } from './api';

interface CommentData {
  content: string;
  snippetId: number;
}

export const postComment = async (data: CommentData) => {
  try {
    const response = await api.post('/comments', data);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const deleteComment = async (commentId: string) => {
  try {
    const response = await api.delete(`/comments/${commentId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
