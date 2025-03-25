import { Avatar, Menu, MenuProps } from 'antd';
import styles from './sider.module.scss';
import Sider from 'antd/es/layout/Sider';
import Home from '@icons/home.svg';
import User from '@icons/user.svg';
import Users from '@icons/users.svg';
import Doc from '@icons/doc.svg';
import UserQuestion from '@icons/user-question.svg';
import { useNavigate } from 'react-router-dom';
import { RootState } from '@store/store';
import { useSelector } from 'react-redux';

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
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const user = useSelector((state: RootState) => state.user.user);
  const navigate = useNavigate();

  const username = isAuthenticated ? user?.username : 'Guest';

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
        navigate('/mysnippets');
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

  return (
    <Sider className={styles.sider}>
      <div className={styles.top}>
        <Avatar size="large" icon={<User />} />
        <span>{username}</span>
      </div>
      <Menu onClick={onClick} items={items} className={styles.menu} defaultActiveFirst />
    </Sider>
  );
};
