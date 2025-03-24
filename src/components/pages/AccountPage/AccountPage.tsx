import { Button, Card, Avatar, Modal } from 'antd';
import styles from './account-page.module.scss';
import { logoutUser } from '@services/authService';
import User from '@icons/user.svg';
import Logout from '@icons/logout.svg';
import Trash from '@icons/trash.svg';
import { useNavigate } from 'react-router-dom';
import { UserNameChangeForm } from '@molecules/UserNameChangeForm/UserNameChangeForm';
import { PasswordChangeForm } from '@molecules/PasswordChangeForm/PasswordChangeForm';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@store/store';
import { useEffect } from 'react';
import { SpinApp } from '@atoms/SpinApp/SpinApp';
import { deleteUser, fetchUserStatistic } from '@store/userSlice';

export const AccountPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const { user, loading } = useSelector((state: RootState) => state.user);
  const { username, role, id, statistic } = user || {};

  useEffect(() => {
    if (id) {
      dispatch(fetchUserStatistic(id));
    }
  }, [dispatch, id]);

  const onLogout = () => {
    logoutUser(dispatch);
  };

  const showDeleteConfirm = () => {
    Modal.confirm({
      title: 'Are you sure you want to delete your account?',
      content: 'This action cannot be undone.',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: async () => {
        navigate('/auth');
        await dispatch(deleteUser());
      },
    });
  };

  const statistics = statistic
    ? [
        { label: 'Rating', value: statistic.rating },
        { label: 'Snippets', value: statistic.snippetsCount },
        { label: 'Comments', value: statistic.commentsCount },
        { label: 'Likes', value: statistic.likesCount },
        { label: 'Dislikes', value: statistic.dislikesCount },
        { label: 'Questions', value: statistic.questionsCount },
        { label: 'Correct Answers', value: statistic.correctAnswersCount },
        { label: 'Regular Answers', value: statistic.regularAnswersCount },
      ]
    : [];

  return loading || !user ? (
    <SpinApp />
  ) : (
    isAuthenticated && (
      <div className={styles.container}>
        <h1>
          Welcome, <span>{username}</span>
        </h1>
        <Card className={styles.profile}>
          <div className={styles.top}>
            <Avatar icon={<User />} className={styles.avatar} />
            <div className={styles.info}>
              <span className={styles.name}>{username}</span>
              <span>Id:{id}</span>
              <span>Role:{role}</span>
              <div className={styles.buttons}>
                <Button type="primary" className={styles.warning} onClick={onLogout}>
                  <Logout className={styles.icon} />
                </Button>
                <Button type="primary" className={styles.danger} onClick={showDeleteConfirm}>
                  <Trash className={styles.icon} />
                </Button>
              </div>
            </div>
          </div>
          <ul className={styles.statistics}>
            {statistics.map(({ label, value }) => (
              <li key={label}>
                <strong>{label}:</strong> {value}
              </li>
            ))}
          </ul>
        </Card>
        <div className={styles.forms}>
          <UserNameChangeForm />
          <PasswordChangeForm />
        </div>
      </div>
    )
  );
};
