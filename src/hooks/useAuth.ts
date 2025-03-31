import { useSelector } from 'react-redux';
import { RootState } from '@store';

export const useAuth = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const user = useSelector((state: RootState) => state.user.user);

  return { isAuthenticated, user };
};
