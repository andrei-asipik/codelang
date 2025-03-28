import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api } from '@services';

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
  user: UserProps;
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
export interface ChangeQuestionPayload {
  payload: CreateQuestionPayload;
  questionId: string;
}
export interface AddAnswerPayload {
  questionId: string;
  content: string;
}

interface QuestionState {
  questions: QuestionProps[];
  loading: boolean;
  error: string | null;
  totalItems: number;
  success: boolean;
  currentQuestion: QuestionProps | null;
  answerLoading: boolean;
}

const initialState: QuestionState = {
  questions: [],
  loading: false,
  error: null,
  success: false,
  totalItems: 1,
  currentQuestion: null,
  answerLoading: false,
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
      })
      // deleteQuestion
      .addCase(deleteQuestion.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteQuestion.fulfilled, (state, action) => {
        state.loading = false;
        state.questions = state.questions.filter((question) => question.id !== action.payload);
        if (state.currentQuestion && state.currentQuestion.id === action.payload) {
          state.currentQuestion = null;
        }
      })
      .addCase(deleteQuestion.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) || action.error.message || 'Failed to remove answer';
      })
      // fetchQuestionById
      .addCase(fetchQuestionById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchQuestionById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentQuestion = action.payload;
      })
      .addCase(fetchQuestionById.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) || action.error.message || 'Failed to load question';
      })
      // deleteAnswer
      .addCase(deleteAnswer.pending, (state) => {
        state.answerLoading = true;
        state.error = null;
      })
      .addCase(deleteAnswer.fulfilled, (state, action) => {
        state.answerLoading = false;
        if (state.currentQuestion && state.currentQuestion.id === action.payload.questionId) {
          state.currentQuestion.answers = state.currentQuestion.answers.filter(
            (answer) => answer.id !== action.payload.answerId
          );
        }
      })
      .addCase(deleteAnswer.rejected, (state, action) => {
        state.answerLoading = false;
        state.error =
          (action.payload as string) || action.error.message || 'Failed to remove answer';
      })
      // addAnswer
      .addCase(addAnswer.pending, (state) => {
        state.answerLoading = true;
        state.error = null;
      })
      .addCase(addAnswer.fulfilled, (state, action) => {
        state.answerLoading = false;
        if (state.currentQuestion && state.currentQuestion.id === action.meta.arg.questionId) {
          state.currentQuestion.answers.push(action.payload);
        }
      })
      .addCase(addAnswer.rejected, (state, action) => {
        state.answerLoading = false;
        state.error = (action.payload as string) || action.error.message || 'Failed to add answer';
      })
      // changeQuestion
      .addCase(changeQuestion.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(changeQuestion.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        if (state.currentQuestion && state.currentQuestion.id === action.payload.id) {
          state.currentQuestion = action.payload;
        }
        const index = state.questions.findIndex((s) => s.id === action.payload.id);
        if (index !== -1) {
          state.questions[index] = action.payload;
        }
      })
      .addCase(changeQuestion.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) || action.error.message || 'Failed to update question';
        state.success = false;
      });
  },
});

export default questionSlice.reducer;
