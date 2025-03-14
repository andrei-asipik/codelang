import { Header } from 'antd/es/layout/layout';
import styles from './header.module.scss';
import { Button } from 'antd';
import Logo from '../../../assets/icons/code.svg';
import Language from '../../../assets/icons/language.svg';

export const HeaderApp = () => (
  <Header className={styles.header}>
    <div className={styles.left}>
      <div className={styles.logo}>
        <Logo />
      </div>
      <span>CODELANG</span>
    </div>
    <div className={styles.right}>
      <Button>Sign In</Button>
      <Button type="text" className={styles.textBtn}>
        <Language />
        EN
      </Button>
    </div>
  </Header>
);
