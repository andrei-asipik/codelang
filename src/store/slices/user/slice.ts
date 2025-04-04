import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initialState } from './initialState';
import { User } from './types';

import {
  fetchUserStatistic,
  fetchUserStatisticById,
  updateUserName,
  updatePassword,
  deleteUser,
  fetchUsers,
} from './thunks';

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
