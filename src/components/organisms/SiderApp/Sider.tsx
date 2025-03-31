import { Avatar, Menu, MenuProps } from 'antd';
import styles from './sider.module.scss';
import Sider from 'antd/es/layout/Sider';
import { User } from '@icons';
import { useLocation, useNavigate } from 'react-router-dom';
import { RootState } from '@store';
import { useSelector } from 'react-redux';
import { menuItems } from './sider.data';
import { Icon } from '@atoms';

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
        items={menuItems.map(({ key, label, icon }) => ({
          key,
          label,
          icon: <Icon icon={icon} className={styles.icon} />,
        }))}
        className={styles.menu}
        selectedKeys={[location.pathname.slice(1)]}
      />
    </Sider>
  );
};
