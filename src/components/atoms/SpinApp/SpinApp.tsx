import { Spin } from 'antd';
import styles from './spin.module.scss';

export const SpinApp = () => (
  <Spin tip="Loading" size="large">
    <div className={styles.spin} />
  </Spin>
);
