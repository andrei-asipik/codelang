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

interface QuestionState {
  questions: QuestionProps[];
  loading: boolean;
  error: string | null;
  totalItems: number;
}

const initialState: QuestionState = {
  questions: [],
  loading: false,
  error: null,
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
      });
  },
});

// export const { login, logout } = authSlice.actions;

export default questionSlice.reducer;
