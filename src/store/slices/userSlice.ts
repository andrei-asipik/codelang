import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { api } from '@services';

export interface User {
  id: number;
  username: string;
  role: string;
  statistic?: UserStatistic;
}

export interface UserStatistic {
  snippetsCount: number;
  rating: number;
  commentsCount: number;
  likesCount: number;
  dislikesCount: number;
  questionsCount: number;
  correctAnswersCount: number;
  regularAnswersCount: number;
}

interface UserState {
  user: User | null;
  loading?: boolean;
  error: string | null;
  success?: boolean;
  users: User[];
  totalItems: number;
  checkedUser: User | null;
}

const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
  success: false,
  users: [],
  totalItems: 1,
  checkedUser: null,
};

export interface UpdateNameData {
  username: string;
}
export interface UpdatePasswordData {
  oldPassword: string;
  newPassword: string;
}

export const fetchUserStatistic = createAsyncThunk(
  'user/fetchUserStatistic',
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await api.get(`/users/${id}/statistic`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to load user statistics');
    }
  }
);

export const updateUserName = createAsyncThunk(
  'user/updateUserName',
  async (data: UpdateNameData, { rejectWithValue }) => {
    try {
      const response = await api.patch('/me', data);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to change name');
    }
  }
);

export const updatePassword = createAsyncThunk(
  'user/updatePassword',
  async (data: UpdatePasswordData, { rejectWithValue }) => {
    try {
      await api.patch('/me/password', data);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to change password');
    }
  }
);

export const deleteUser = createAsyncThunk('user/deleteUser', async (_, { rejectWithValue }) => {
  try {
    await api.delete('/me');
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || 'Failed to delete user');
  }
});

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async ({ page }: { page: number }, { rejectWithValue }) => {
    try {
      const response = await api.get(`/users?limit=20&page=${page}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Something went wrong');
    }
  }
);
export const fetchUserStatisticById = createAsyncThunk(
  'user/fetchUserStatisticById',
  async (userId: number, { rejectWithValue }) => {
    try {
      const response = await api.get(`/users/${userId}/statistic`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to load user statistics');
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },
    clearUser(state) {
      state.user = null;
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchUserStatistic
      .addCase(fetchUserStatistic.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserStatistic.fulfilled, (state, action: PayloadAction<User>) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(fetchUserStatistic.rejected, (state, action) => {
        state.error =
          (action.payload as string) || action.error.message || 'Failed to load user statistics';
        state.loading = false;
      })
      // fetchUserStatisticById
      .addCase(fetchUserStatisticById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserStatisticById.fulfilled, (state, action: PayloadAction<User>) => {
        state.checkedUser = action.payload;
        state.loading = false;
      })
      .addCase(fetchUserStatisticById.rejected, (state, action) => {
        state.error =
          (action.payload as string) || action.error.message || 'Failed to load user statistics';
        state.loading = false;
      })
      // updateUserName
      .addCase(updateUserName.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserName.fulfilled, (state, action: PayloadAction<User>) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(updateUserName.rejected, (state, action) => {
        state.error = (action.payload as string) || action.error.message || 'Failed to change name';
        state.loading = false;
      })
      // updatePassword
      .addCase(updatePassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updatePassword.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.error =
          (action.payload as string) || action.error.message || 'Failed to change password';
        state.loading = false;
        state.success = false;
      })
      // deleteUser
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(deleteUser.fulfilled, (state) => {
        state.user = null;
        state.loading = false;
        state.success = true;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.error = (action.payload as string) || action.error.message || 'Failed to delete user';
        state.loading = false;
        state.success = false;
      })
      // fetchUsers
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.data.data;
        state.totalItems = action.payload.data.meta.totalItems;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || action.error.message || 'Failed to load users';
      });
  },
});

export const { setUser, clearUser, clearError } = userSlice.actions;
export default userSlice.reducer;
