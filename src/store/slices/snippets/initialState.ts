import { SnippetState } from './types';

export const initialState: SnippetState = {
  snippets: [],
  loading: false,
  snippetUpdating: false,
  error: null,
  success: false,
  totalItems: 1,
  currentSnippet: null,
  commentLoading: false,
};
