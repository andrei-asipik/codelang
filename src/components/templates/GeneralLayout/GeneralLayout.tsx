import { Outlet } from 'react-router-dom';

import { Layout, Modal } from 'antd';
import { Content } from 'antd/es/layout/layout';
import styles from './general-layout.module.scss';
import { HeaderApp } from '@organisms/HeaderApp/HeaderApp';
import { SiderApp } from '@organisms/SiderApp/Sider';
import { useSelector } from 'react-redux';
import { RootState } from '@store/store';
import { useEffect } from 'react';

export const GeneralLayout = () => {
  const { success, error } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (error) {
      Modal.error({
        title: 'Error',
        content: error,
      });
    }
  }, [error]);

  useEffect(() => {
    if (success) {
      Modal.success({
        title: 'Success',
        content: 'Password changed successfully!',
      });
    }
  }, [success]);

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
