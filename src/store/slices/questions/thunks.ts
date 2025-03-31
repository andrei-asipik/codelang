import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '@services';
import { AddAnswerPayload, ChangeQuestionPayload, CreateQuestionPayload } from './types';

export const fetchQuestions = createAsyncThunk(
  'questions/fetchQuestions',
  async (page: number, { rejectWithValue }) => {
    try {
      const response = await api.get(`/questions?limit=10&page=${page}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Registration error');
    }
  }
);

export const createQuestion = createAsyncThunk(
  'questions/crateQuestion',
  async (payload: CreateQuestionPayload, { rejectWithValue }) => {
    try {
      const response = await api.post(`/questions`, payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Create question error');
    }
  }
);

export const deleteQuestion = createAsyncThunk(
  'questions/deleteQuestion',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/questions/${id}`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete question');
    }
  }
);

export const fetchQuestionById = createAsyncThunk(
  'questions/fetchQuestionById',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await api.get(`/questions/${id}`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to load question');
    }
  }
);

export const deleteAnswer = createAsyncThunk(
  'questions/deleteAnswer',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/answers/${id}`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete answer');
    }
  }
);

export const addAnswer = createAsyncThunk(
  'questions/addAnswer',
  async (payload: AddAnswerPayload, { rejectWithValue }) => {
    try {
      const response = await api.post(`/answers`, payload);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to add answer');
    }
  }
);
export const changeQuestion = createAsyncThunk(
  'questions/changeQuestion',
  async ({ payload, questionId }: ChangeQuestionPayload, { rejectWithValue }) => {
    try {
      const response = await api.patch(`/questions/${questionId}`, payload);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update question');
    }
  }
);
