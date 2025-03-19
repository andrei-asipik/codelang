import { Avatar, Button, Menu, MenuProps } from 'antd';
import styles from './sider.module.scss';
import Sider from 'antd/es/layout/Sider';
import Home from '@icons/home.svg';
import User from '@icons/user.svg';
import Users from '@icons/users.svg';
import Doc from '@icons/doc.svg';
import UserQuestion from '@icons/user-question.svg';
import { logoutUser } from '@services/authService';
import { useNavigate } from 'react-router-dom';

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  {
    type: 'divider',
  },
  {
    key: 'home',
    label: 'Home',
    icon: <Home className={styles.icon} />,
  },
  {
    key: 'myaccount',
    label: 'My Account',
    icon: <User className={styles.icon} />,
  },
  {
    key: 'postsnippet',
    label: 'Post snippet',
    icon: <Doc className={styles.icon} />,
  },
  {
    key: 'mysnippet',
    label: 'My snippets',
    icon: <Doc className={styles.icon} />,
  },
  {
    key: 'questions',
    label: 'Questions',
    icon: <UserQuestion className={styles.icon} />,
  },
  {
    key: 'users',
    label: 'Users',
    icon: <Users className={styles.icon} />,
  },
  {
    type: 'divider',
  },
];

export const SiderApp = () => {
  const navigate = useNavigate();

  const onClick: MenuProps['onClick'] = (e) => {
    const key = e.key;
    switch (key) {
      case 'home':
        navigate('/');
        break;
      case 'myaccount':
        navigate('/account');
        break;
      case 'postsnippet':
        navigate('/postsnippet');
        break;
      case 'mysnippet':
        navigate('/mysnippet');
        break;
      case 'questions':
        navigate('/questions');
        break;
      case 'users':
        navigate('/users');
        break;
      default:
        console.log('unknown key', key);
    }
  };

  const logout = () => {
    logoutUser();
    navigate('/auth');
  };

  return (
    <Sider className={styles.sider}>
      <div className={styles.top}>
        <Avatar size="large" icon={<Home />} />
        <span>Username</span>
      </div>
      <Menu onClick={onClick} items={items} className={styles.menu} defaultActiveFirst />
      <div className={styles.bottom}>
        <Button className={styles.button} onClick={logout}>
          Sign Out
        </Button>
      </div>
    </Sider>
  );
};
