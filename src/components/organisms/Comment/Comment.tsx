import { Button, List } from 'antd';
import styles from './comment.module.scss';
import User from '@icons/user.svg';
import { CommentProps, deleteComment } from '@store/snippetSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@store/store';

export const Comment = ({ comment, snippetId }: { comment: CommentProps; snippetId: string }) => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user.user);
  const { id: userId } = user;

  const handleDelete = () => {
    dispatch(deleteComment({ snippetId, commentId: comment.id }));
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
