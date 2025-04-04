import { QuestionState } from './types';

export const initialState: QuestionState = {
  questions: [],
  loading: false,
  error: null,
  success: false,
  totalItems: 1,
  currentQuestion: null,
  answerLoading: false,
};
