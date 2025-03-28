import { Avatar, Menu, MenuProps } from 'antd';
import styles from './sider.module.scss';
import Sider from 'antd/es/layout/Sider';
import { Home, User, Users, Doc, UserQuestion } from '@icons';
import { useLocation, useNavigate } from 'react-router-dom';
import { RootState } from '@store';
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
    key: 'account',
    label: 'My Account',
    icon: <User className={styles.icon} />,
  },
  {
    key: 'postsnippet',
    label: 'Post snippet',
    icon: <Doc className={styles.icon} />,
  },
  {
    key: 'mysnippets',
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
  const location = useLocation();

  const username = isAuthenticated ? user?.username : 'Guest';

  const onClick: MenuProps['onClick'] = (e) => {
    navigate(e.key);
  };

  return (
    <Sider className={styles.sider}>
      <div className={styles.top}>
        <Avatar size="large" icon={<User />} />
        <span>{username}</span>
      </div>
      <Menu
        onClick={onClick}
        items={items}
        className={styles.menu}
        selectedKeys={[location.pathname.slice(1)]}
      />
    </Sider>
  );
};
