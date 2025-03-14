import styles from './home-page.module.scss';

export const HomePage = () => (
  <div>
    <h1>{'Welcome'}</h1>
    <p className={styles.text}>Some text</p>
  </div>
);
