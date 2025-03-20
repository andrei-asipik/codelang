import { Button, Card, Avatar, Modal } from 'antd';
import styles from './account-page.module.scss';
import { logoutUser } from '@services/authService';
import User from '@icons/user.svg';
import Logout from '@icons/logout.svg';
import Trash from '@icons/trash.svg';
import { useNavigate } from 'react-router-dom';
import { UserNameChangeForm } from '@molecules/UserNameChangeForm/UserNameChangeForm';
import { PasswordChangeForm } from '@molecules/PasswordChangeForm/PasswordChangeForm';
import { deleteUser, getUserStatistic } from '@services/accountService';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@store/store';
import { useEffect } from 'react';
import { SpinApp } from '@atoms/SpinApp/SpinApp';

export const AccountPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const user = useSelector((state: RootState) => state.user.user);
  const { username, role, id, statistic } = user;

  useEffect(() => {
    const fetchUserStatistic = async () => {
      if (!id) return;
      try {
        await getUserStatistic(dispatch, id);
      } catch (error) {
        Modal.error({
          title: 'Error',
          content: error.response?.data?.message || 'Failed to load user statistics.',
        });
      }
    };

    fetchUserStatistic();
  }, [dispatch, id]);

  const onLogout = () => {
    logoutUser(dispatch);
    navigate('/auth');
  };

  const showDeleteConfirm = () => {
    Modal.confirm({
      title: 'Are you sure you want to delete your account?',
      content: 'This action cannot be undone.',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: async () => {
        try {
          await deleteUser();
          Modal.success({
            title: 'Success',
            content: 'Your account has been deleted!',
            onOk: () => navigate('/auth'),
          });
        } catch (error) {
          Modal.error({
            title: 'Error',
            content: error.response?.data?.message || 'Failed to delete account.',
          });
        }
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

  return !statistic ? (
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
