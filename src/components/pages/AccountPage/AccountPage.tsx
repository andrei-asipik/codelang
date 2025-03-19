import { Button, Card, Avatar, Modal } from 'antd';
import styles from './account-page.module.scss';
import { logoutUser } from '@services/authService';
import User from '@icons/user.svg';
import Logout from '@icons/logout.svg';
import Trash from '@icons/trash.svg';
import { useNavigate } from 'react-router-dom';
import { UserNameChangeForm } from '@molecules/UserNameChangeForm/UserNameChangeForm';
import { PasswordChangeForm } from '@molecules/PasswordChangeForm/PasswordChangeForm';
import { deleteUser } from '@services/accountService';

const userData = { userName: 'Username', id: '55', role: 'user' };

export const AccountPage = () => {
  const navigate = useNavigate();

  const logout = () => {
    logoutUser();
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

  return (
    <div className={styles.container}>
      <h1>
        Welcome, <span>{userData.userName}</span>
      </h1>
      <Card className={styles.profile}>
        <div className={styles.top}>
          <Avatar icon={<User />} className={styles.avatar} />
          <div className={styles.info}>
            <span className={styles.name}>{userData.userName}</span>
            <span>Id:{userData.id}</span>
            <span>Role:{userData.role}</span>
            <div className={styles.buttons}>
              <Button type="primary" className={styles.warning} onClick={logout}>
                <Logout className={styles.icon} />
              </Button>
              <Button type="primary" className={styles.danger} onClick={showDeleteConfirm}>
                <Trash className={styles.icon} />
              </Button>
            </div>
          </div>
        </div>
        <p>Card content</p>
      </Card>
      <div className={styles.forms}>
        <UserNameChangeForm />
        <PasswordChangeForm />
      </div>
    </div>
  );
};
