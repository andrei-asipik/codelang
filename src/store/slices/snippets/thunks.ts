import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '@services';
import { MarkProps } from './types';

export const fetchSnippets = createAsyncThunk(
  'snippets/fetchSnippets',
  async (page: number, { rejectWithValue }) => {
    try {
      const response = await api.get(`/snippets?limit=10&page=${page}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Something went wrong');
    }
  }
);

export const fetchSnippetsOfUser = createAsyncThunk(
  'snippets/fetchSnippetsOfUser',
  async ({ userId, page }: { userId: string; page: number }, { rejectWithValue }) => {
    try {
      const response = await api.get(`/snippets?userId=${userId}&limit=10&page=${page}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Something went wrong');
    }
  }
);

export const addSnippetMark = createAsyncThunk(
  'snippets/addSnippetMark',
  async ({ id, mark }: { id: string; mark: MarkProps['type'] }, { rejectWithValue }) => {
    try {
      await api.post(`/snippets/${id}/mark`, { mark });
      const response = await api.get(`/snippets/${id}`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to add mark');
    }
  }
);

export const fetchSnippetById = createAsyncThunk(
  'snippets/fetchSnippetById',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await api.get(`/snippets/${id}`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to load snippet');
    }
  }
);

export const addComment = createAsyncThunk(
  'snippets/addComment',
  async ({ snippetId, content }: { snippetId: string; content: string }, { rejectWithValue }) => {
    try {
      const response = await api.post(`/comments`, { content, snippetId });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to add comment');
    }
  }
);

export const deleteComment = createAsyncThunk(
  'snippets/deleteComment',
  async (
    { snippetId, commentId }: { snippetId: string; commentId: string },
    { rejectWithValue }
  ) => {
    try {
      await api.delete(`/comments/${commentId}`);
      return { snippetId, commentId };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete comment');
    }
  }
);

export const createSnippet = createAsyncThunk(
  'snippets/createSnippet',
  async ({ code, language }: { code: string; language: string }, { rejectWithValue }) => {
    try {
      const response = await api.post(`/snippets`, { code, language });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Something went wrong');
    }
  }
);

export const deleteSnippet = createAsyncThunk(
  'snippets/deleteSnippet',
  async (snippetId: string, { rejectWithValue }) => {
    try {
      await api.delete(`/snippets/${snippetId}`);
      return snippetId;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete snippet');
    }
  }
);

export const changeSnippet = createAsyncThunk(
  'snippets/changeSnippet',
  async (
    { snippetId, code, language }: { snippetId: string; code: string; language: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.patch(`/snippets/${snippetId}`, { code, language });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update snippet');
    }
  }
);
