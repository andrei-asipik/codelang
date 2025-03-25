import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '@services/api';
import { CommentProps } from './snippetSlice';

interface CommentState {
  comments: CommentProps[];
  loading: boolean;
  error: string | null;
}

const initialState: CommentState = {
  comments: [],
  loading: false,
  error: null,
};

export const fetchCommentsBySnippetId = createAsyncThunk(
  'comments/fetchCommentsBySnippetId',
  async (snippetId: string, { rejectWithValue }) => {
    try {
      const response = await api.get(`/comments?snippetId=${snippetId}`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Ошибка загрузки комментариев');
    }
  }
);

export const addComment = createAsyncThunk(
  'comments/addComment',
  async ({ snippetId, content }: { snippetId: string; content: string }, { rejectWithValue }) => {
    try {
      const response = await api.post(`/comments`, { content, snippetId });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Ошибка добавления комментария');
    }
  }
);

export const deleteComment = createAsyncThunk(
  'comments/deleteComment',
  async (commentId: string, { rejectWithValue }) => {
    try {
      await api.delete(`/comments/${commentId}`);
      return commentId;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Ошибка удаления комментария');
    }
  }
);

const commentSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchCommentsBySnippetId
      .addCase(fetchCommentsBySnippetId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCommentsBySnippetId.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = action.payload;
      })
      .addCase(fetchCommentsBySnippetId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      //addComment
      .addCase(addComment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.loading = false;
        state.comments.push(action.payload); // add new comment
      })
      .addCase(addComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      //deleteComment'
      .addCase(deleteComment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = state.comments.filter((comment) => comment.id !== action.payload);
      })
      .addCase(deleteComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default commentSlice.reducer;
