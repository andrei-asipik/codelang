import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '@services/api';

interface User {
  id: string;
  username: string;
  role: string;
}

export interface Mark {
  id: string;
  type: 'like' | 'dislike';
  user: User;
}

export interface CommentProps {
  id: string;
  content: string;
  user: {
    id: string;
    username: string;
    role: string;
  };
}

export interface SnippetProps {
  id: string;
  code: string;
  language: string;
  marks: Mark[];
  user: User;
  comments: CommentProps[];
}

interface SnippetState {
  snippets: SnippetProps[];
  loading: boolean;
  snippetUpdating: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
}

const initialState: SnippetState = {
  snippets: [],
  loading: false,
  snippetUpdating: false,
  error: null,
  currentPage: 1,
  totalPages: 1,
};

export const fetchSnippets = createAsyncThunk(
  'snippets/fetchSnippets',
  async (page: number, { rejectWithValue }) => {
    try {
      const response = await api.get(`/snippets?limit=10&page=${page}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Something went wrong');
    }
  }
);

export const addSnippetMark = createAsyncThunk(
  'snippets/addSnippetMark',
  async ({ id, mark }: { id: string; mark: Mark['type'] }, { rejectWithValue }) => {
    try {
      await api.post(`/snippets/${id}/mark`, { mark });
      const response = await api.get(`/snippets/${id}`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to add mark');
    }
  }
);

// export const fetchSnippetById = createAsyncThunk(
//   'snippets/fetchSnippetById',
//   async (id: string, { rejectWithValue }) => {
//     try {
//       const response = await api.get(`/snippets/${id}`);
//       return response.data.data; // Предполагаем, что данные лежат в response.data.data
//     } catch (error) {
//       return rejectWithValue(error.response?.data?.message || 'Failed to load snippet');
//     }
//   }
// );

// export const addComment = createAsyncThunk(
//   'snippets/addComment',
//   async ({ snippetId, content }: { snippetId: string; content: string }, { rejectWithValue }) => {
//     try {
//       await api.post(`/comments`, { content, snippetId });
//       const response = await api.get(`/snippets/${snippetId}`);
//       return response.data.data; // Обновленный сниппет с комментариями
//     } catch (error) {
//       return rejectWithValue(error.response?.data?.message || 'Failed to add comment');
//     }
//   }
// );

// Срез для сниппетов
const snippetSlice = createSlice({
  name: 'snippets',
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      //fetchSnippets
      .addCase(fetchSnippets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSnippets.fulfilled, (state, action) => {
        state.loading = false;
        state.snippets = action.payload.data.data;
        state.totalPages = action.payload.data.meta.totalItems;
      })
      .addCase(fetchSnippets.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) || action.error.message || 'Failed to load snippets';
      })
      //addSnippetMark
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
      });
    //   // Обработка fetchSnippetById
    //   .addCase(fetchSnippetById.pending, (state) => {
    //     state.loading = true;
    //     state.error = null;
    //   })
    //   .addCase(fetchSnippetById.fulfilled, (state, action) => {
    //     state.loading = false;
    //     state.currentSnippet = action.payload;
    //   })
    //   .addCase(fetchSnippetById.rejected, (state, action) => {
    //     state.loading = false;
    //     state.error = action.payload as string;
    //   })
    // Обработка addComment
    //   .addCase(addComment.pending, (state) => {
    //     state.loading = true;
    //     state.error = null;
    //   })
    //   .addCase(addComment.fulfilled, (state, action) => {
    //     state.loading = false;
    //     // state.currentSnippet = action.payload;
    //   })
    //   .addCase(addComment.rejected, (state, action) => {
    //     state.loading = false;
    //     state.error = action.payload as string;
    //   });
  },
});

export const { setCurrentPage } = snippetSlice.actions;
export default snippetSlice.reducer;
