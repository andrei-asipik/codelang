import { Button } from 'antd';
import styles from './counter.module.scss';
import { Less } from '@icons';

interface CounterProps {
  count: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

export const Counter = ({ count, onIncrement, onDecrement }: CounterProps) => {
  return (
    <div className={styles.counter}>
      <Button
        shape="circle"
        type="text"
        icon={<Less className={`${styles.icon} ${styles.more}`} />}
        onClick={onIncrement}
      />
      <b>{count}</b>
      <Button
        shape="circle"
        type="text"
        icon={<Less className={styles.icon} />}
        onClick={onDecrement}
      />
    </div>
  );
};
