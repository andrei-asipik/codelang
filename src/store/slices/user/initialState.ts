import { UserState } from './types';

export const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
  success: false,
  users: [],
  totalItems: 1,
  checkedUser: null,
};
