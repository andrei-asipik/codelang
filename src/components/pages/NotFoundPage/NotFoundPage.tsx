import { ReactNode } from 'react';

import styles from './not-found-page.module.css';

export const BrokenComponent = (): ReactNode => {
  throw new Error('Это тестовая ошибка!');
};

export const NotFoundPage = () => (
  <div className={styles.notFound}>
    <h3>404 - Not Found</h3>
    <BrokenComponent />
  </div>
);
