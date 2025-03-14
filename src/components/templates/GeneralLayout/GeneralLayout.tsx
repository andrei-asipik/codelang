import { Outlet } from 'react-router-dom';

import styles from './general-layout.module.scss';

export const GeneralLayout = () => (
  <div className={styles.pageLayout}>
    <Outlet />
  </div>
);
