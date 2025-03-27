import { Header } from 'antd/es/layout/layout';
import styles from './header.module.scss';
import { Button } from 'antd';
import Logo from '@icons/code.svg';
import Language from '@icons/language.svg';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'src/store/store';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '@store/authSlice';

export const HeaderApp = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const logout = () => {
    dispatch(logoutUser());
    navigate('/auth');
  };

  const askClick = () => {
    navigate('/askquestion');
  };

  return (
    <Header className={styles.header}>
      <div className={styles.left}>
        <div className={styles.logo}>
          <Logo />
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
        <Button type="text" className={styles.textBtn}>
          <Language />
          EN
        </Button>
      </div>
    </Header>
  );
};
