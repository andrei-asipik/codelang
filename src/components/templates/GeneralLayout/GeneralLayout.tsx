import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';
import { Content } from 'antd/es/layout/layout';
import styles from './general-layout.module.scss';
import { HeaderApp, SiderApp } from '@organisms';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@store';
import { useNotifications } from '@hooks';
import { useEffect } from 'react';
import { checkAuth } from '@store';

export const GeneralLayout = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  const { success: userSuccess, error: userError } = useSelector((state: RootState) => state.user);
  const { success: snippetSuccess, error: snippetError } = useSelector(
    (state: RootState) => state.snippets
  );
  const { error: authError } = useSelector((state: RootState) => state.auth);
  const { success: questionSuccess, error: questionError } = useSelector(
    (state: RootState) => state.questions
  );

  useNotifications(userSuccess, userError);
  useNotifications(undefined, authError);
  useNotifications(snippetSuccess, snippetError);
  useNotifications(questionSuccess, questionError);

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
