import { Outlet } from 'react-router-dom';

import { Layout } from 'antd';
import { Content } from 'antd/es/layout/layout';
import styles from './general-layout.module.scss';
import { HeaderApp } from '@organisms/HeaderApp/HeaderApp';
import { SiderApp } from '@organisms/SiderApp/Sider';

export const GeneralLayout = () => (
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
