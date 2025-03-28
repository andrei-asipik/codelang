import { Button, Card, Avatar, Modal } from 'antd';
import styles from './account-page.module.scss';
import { User, Logout, Trash } from '@icons';
import { useNavigate } from 'react-router-dom';
import { UserNameChangeForm, PasswordChangeForm } from '@molecules';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { SpinApp } from '@atoms';
import { AppDispatch, RootState, deleteUser, fetchUserStatistic, logoutUser } from '@store';

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
    dispatch(logoutUser());
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
                <b>{label}:</b> {value}
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
