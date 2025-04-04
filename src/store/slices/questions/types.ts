import { UserProps } from '@store';

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

export interface QuestionState {
  questions: QuestionProps[];
  loading: boolean;
  error: string | null;
  totalItems: number;
  success: boolean;
  currentQuestion: QuestionProps | null;
  answerLoading: boolean;
}
