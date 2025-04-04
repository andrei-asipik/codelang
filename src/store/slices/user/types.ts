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

export interface UserState {
  user: User | null;
  loading?: boolean;
  error: string | null;
  success?: boolean;
  users: User[];
  totalItems: number;
  checkedUser: User | null;
}

export interface UpdateNameData {
  username: string;
}
export interface UpdatePasswordData {
  oldPassword: string;
  newPassword: string;
}
