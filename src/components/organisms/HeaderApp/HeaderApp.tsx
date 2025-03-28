import { Header } from 'antd/es/layout/layout';
import styles from './header.module.scss';
import { Button } from 'antd';
import { Code, Language } from '@icons';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState, logoutUser } from '@store';
import { useNavigate } from 'react-router-dom';

export const HeaderApp = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const logout = () => {
    dispatch(logoutUser());
    navigate('/auth');
  };

  const askClick = () => {
    if (isAuthenticated) {
      navigate('/askquestion');
    } else {
      navigate('/auth');
    }
  };

  return (
    <Header className={styles.header}>
      <div className={styles.left}>
        <div className={styles.logo}>
          <Code />
        </div>
        <span>CODELANG</span>
      </div>
      <div className={styles.right}>
        <Button className={styles.button} onClick={askClick}>
          Ask question
        </Button>
        {isAuthenticated ? (
          <Button className={styles.button} onClick={logout}>
            Sign Out
          </Button>
        ) : (
          <Button href="/auth">Sign In</Button>
        )}
        <Button type="text" disabled className={styles.textBtn}>
          <Language />
          EN
        </Button>
      </div>
    </Header>
  );
};
