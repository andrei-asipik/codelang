import { Button, List } from 'antd';
import styles from './answer.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState, AnswerProps, deleteAnswer } from '@store';
import { useNavigate } from 'react-router-dom';
import { Counter } from '@atoms';

export const Answer = ({ answer }: { answer: AnswerProps }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user.user);
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  const userId = user?.id ?? '';

  const handleDelete = () => {
    dispatch(deleteAnswer(answer.id));
  };

  const canDelete = answer.user.id == String(userId);

  const handleMarkClick = (mark: string) => {
    const payload = {
      answerId: answer.id,
      mark: mark,
    };
    if (isAuthenticated) {
      console.log('answerId:', payload.answerId, 'mark:', payload.mark);
    } else {
      navigate('/auth');
    }
  };

  const handleMoreClick = () => handleMarkClick('correct');
  const handleLessClick = () => handleMarkClick('incorrect');

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
        avatar={<Counter count={0} onIncrement={handleMoreClick} onDecrement={handleLessClick} />}
        title={<b>{answer.user.username}</b>}
        description={answer.content}
      />
    </List.Item>
  );
};
