import { Button, Menu, MenuProps } from 'antd';
import styles from './sider.module.scss';
import Sider from 'antd/es/layout/Sider';
import Home from '@icons/home.svg';
import User from '@icons/user.svg';
import Users from '@icons/users.svg';
import Doc from '@icons/doc.svg';
import UserQuestion from '@icons/user-question.svg';
import { logoutUser } from '@services/authService';

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  {
    key: 'user',
    label: 'User',
    icon: <Home />,
  },
  {
    type: 'divider',
  },
  {
    key: 'home',
    label: 'Home',
    icon: <Home />,
  },
  {
    key: 'myaccount',
    label: 'My Account',
    icon: <User />,
  },
  {
    key: 'postsnippet',
    label: 'Post snippet',
    icon: <Doc />,
  },
  {
    key: 'mysnippet',
    label: 'My snippets',
    icon: <Doc />,
  },
  {
    key: 'questions',
    label: 'Questions',
    icon: <UserQuestion />,
  },
  {
    key: 'users',
    label: 'Users',
    icon: <Users />,
  },
  {
    type: 'divider',
  },
];

export const SiderApp = () => {
  const logout = () => {
    logoutUser();
  };
  //   const onClick: MenuProps['onClick'] = (e) => {
  //     console.log('click ', e);
  //   };

  return (
    <Sider className={styles.sider}>
      <Menu
        //   onClick={onClick}
        items={items}
        className={styles.menu}
      />
      <div className={styles.bottom}>
        <Button className={styles.button} onClick={logout}>
          Sign Out
        </Button>
      </div>
    </Sider>
  );
};
