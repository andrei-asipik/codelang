import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api } from '@services/api';

export interface QuestionProps {
  id: string;
  title: string;
  description: string;
  attachedCode: string;
  answers: AnswerProps[];
  user: UserProps;
  isResolved: boolean;
}
export interface AnswerProps {
  id: string;
  content: string;
  isCorrect: boolean;
}

export interface UserProps {
  id: string;
  username: string;
  role: string;
}

export interface CreateQuestionPayload {
  title: string;
  description: string;
  attachedCode?: string;
}

interface QuestionState {
  questions: QuestionProps[];
  loading: boolean;
  error: string | null;
  totalItems: number;
  success: boolean;
}

const initialState: QuestionState = {
  questions: [],
  loading: false,
  error: null,
  success: false,
  totalItems: 1,
};

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

const questionSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //fetchQuestions
      .addCase(fetchQuestions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchQuestions.fulfilled, (state, action) => {
        state.loading = false;
        state.questions = action.payload.data.data;
        state.totalItems = action.payload.data.meta.totalItems;
      })
      .addCase(fetchQuestions.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) || action.error.message || 'Failed to load questions';
      })
      // createQuestion
      .addCase(createQuestion.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(createQuestion.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(createQuestion.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) || action.error.message || 'Failed to create question';
        state.success = null;
      });
  },
});

export default questionSlice.reducer;
