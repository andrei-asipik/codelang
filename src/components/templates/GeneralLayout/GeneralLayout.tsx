import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';
import { Content } from 'antd/es/layout/layout';
import styles from './general-layout.module.scss';
import { HeaderApp } from '@organisms/HeaderApp/HeaderApp';
import { SiderApp } from '@organisms/SiderApp/Sider';
import { useSelector } from 'react-redux';
import { RootState } from '@store/store';
import { useNotifications } from '@hooks/useNotifications';

export const GeneralLayout = () => {
  const { success: userSuccess, error: userError } = useSelector((state: RootState) => state.user);
  const { error: authError } = useSelector((state: RootState) => state.auth);

  useNotifications(userSuccess, userError);
  useNotifications(undefined, authError);

  return (
    <Layout className={styles.mainContainer}>
      <HeaderApp />
      <Layout>
        <SiderApp />
        <Layout className={styles.container}>
          <Content className={styles.content}>
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};
