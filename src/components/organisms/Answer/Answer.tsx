import { Button, List } from 'antd';
import styles from './answer.module.scss';
import User from '@icons/user.svg';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@store/store';
import { AnswerProps, deleteAnswer } from '@store/questionSlice';

export const Answer = ({ answer }: { answer: AnswerProps }) => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user.user);
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  const userId = user?.id ?? '';

  const handleDelete = () => {
    dispatch(deleteAnswer(answer.id));
  };

  const canDelete = answer.user.id == String(userId);

  return (
    <List.Item
      actions={
        canDelete && isAuthenticated
          ? [
              <div className={styles.buttons} key={answer.id}>
                <Button type="text" onClick={handleDelete}>
                  delete
                </Button>
              </div>,
            ]
          : undefined
      }
    >
      <List.Item.Meta
        avatar={<User className={styles.icon} />}
        title={<strong>{answer.user.username}</strong>}
        description={answer.content}
      />
    </List.Item>
  );
};
