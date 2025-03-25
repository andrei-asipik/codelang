import { Button, List } from 'antd';
import styles from './comment.module.scss';
import User from '@icons/user.svg';
import { CommentProps } from '@store/snippetSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@store/store';
import { deleteComment } from '@store/commentSlice';

export const Comment = ({ comment, userId }: { comment: CommentProps; userId: number }) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleDelete = () => {
    dispatch(deleteComment(comment.id));
  };

  const canDelete = comment.user?.id === String(userId);

  return (
    <List.Item
      actions={
        canDelete
          ? [
              <div className={styles.buttons} key={comment.id}>
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
        title={<strong>{comment.user.username}</strong>}
        description={comment.content}
      />
    </List.Item>
  );
};
