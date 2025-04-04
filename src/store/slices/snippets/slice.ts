import { createSlice } from '@reduxjs/toolkit';
import { initialState } from './initialState';
import {
  fetchSnippets,
  addSnippetMark,
  fetchSnippetById,
  addComment,
  deleteComment,
  createSnippet,
  deleteSnippet,
  fetchSnippetsOfUser,
  changeSnippet,
} from './thunks';

const snippetSlice = createSlice({
  name: 'snippets',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchSnippets
      .addCase(fetchSnippets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSnippets.fulfilled, (state, action) => {
        state.loading = false;
        state.snippets = action.payload.data.data;
        state.totalItems = action.payload.data.meta.totalItems;
      })
      .addCase(fetchSnippets.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) || action.error.message || 'Failed to load snippets';
      })
      // addSnippetMark
      .addCase(addSnippetMark.pending, (state) => {
        state.snippetUpdating = true;
        state.error = null;
      })
      .addCase(addSnippetMark.fulfilled, (state, action) => {
        state.snippetUpdating = false;
        const index = state.snippets.findIndex((s) => s.id === action.payload.id);
        if (index !== -1) {
          state.snippets[index] = action.payload;
        } else {
          state.snippets.push(action.payload);
        }
      })
      .addCase(addSnippetMark.rejected, (state, action) => {
        state.snippetUpdating = false;
        state.error = (action.payload as string) || action.error.message || 'Failed to add mark';
      })
      // fetchSnippetById
      .addCase(fetchSnippetById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSnippetById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentSnippet = action.payload;
      })
      .addCase(fetchSnippetById.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) || action.error.message || 'Failed to load snippet';
      })
      // addComment
      .addCase(addComment.pending, (state) => {
        state.commentLoading = true;
        state.error = null;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.commentLoading = false;
        if (state.currentSnippet && state.currentSnippet.id === action.meta.arg.snippetId) {
          state.currentSnippet.comments.push(action.payload);
        }
      })
      .addCase(addComment.rejected, (state, action) => {
        state.commentLoading = false;
        state.error = (action.payload as string) || action.error.message || 'Failed to add comment';
      })
      // deleteComment
      .addCase(deleteComment.pending, (state) => {
        state.commentLoading = true;
        state.error = null;
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.commentLoading = false;
        if (state.currentSnippet && state.currentSnippet.id === action.payload.snippetId) {
          state.currentSnippet.comments = state.currentSnippet.comments.filter(
            (comment) => comment.id !== action.payload.commentId
          );
        }
      })
      .addCase(deleteComment.rejected, (state, action) => {
        state.commentLoading = false;
        state.error =
          (action.payload as string) || action.error.message || 'Failed to remove comment';
      })
      // createSnippet
      .addCase(createSnippet.pending, (state) => {
        state.error = null;
        state.success = false;
      })
      .addCase(createSnippet.fulfilled, (state) => {
        state.success = true;
        state.error = null;
      })
      .addCase(createSnippet.rejected, (state, action) => {
        state.error = (action.payload as string) || action.error.message || 'Failed to add snippet';
        state.success = false;
      })
      // deleteSnippet
      .addCase(deleteSnippet.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteSnippet.fulfilled, (state, action) => {
        state.loading = false;
        state.snippets = state.snippets.filter((snippet) => snippet.id !== action.payload);
        if (state.currentSnippet && state.currentSnippet.id === action.payload) {
          state.currentSnippet = null;
        }
      })
      .addCase(deleteSnippet.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) || action.error.message || 'Failed to delete snippet';
      })

      // fetchSnippetsOfUser
      .addCase(fetchSnippetsOfUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSnippetsOfUser.fulfilled, (state, action) => {
        state.loading = false;
        state.snippets = action.payload.data.data;
        state.totalItems = action.payload.data.meta.totalItems;
      })
      .addCase(fetchSnippetsOfUser.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) || action.error.message || 'Failed to load snippets';
      })
      // changeSnippet
      .addCase(changeSnippet.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(changeSnippet.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        if (state.currentSnippet && state.currentSnippet.id === action.payload.id) {
          state.currentSnippet = action.payload;
        }
        const index = state.snippets.findIndex((s) => s.id === action.payload.id);
        if (index !== -1) {
          state.snippets[index] = action.payload;
        }
      })
      .addCase(changeSnippet.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) || action.error.message || 'Failed to update snippet';
        state.success = false;
      });
  },
});

export default snippetSlice.reducer;
