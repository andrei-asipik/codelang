import { createSlice } from '@reduxjs/toolkit';
import { initialState } from './initialState';
import {
  addAnswer,
  changeQuestion,
  createQuestion,
  deleteAnswer,
  deleteQuestion,
  fetchQuestionById,
  fetchQuestions,
} from './thunks';

const questionSlice = createSlice({
  name: 'questions',
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
