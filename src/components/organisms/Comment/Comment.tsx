import { Button, List, Modal } from 'antd';
import styles from './comment.module.scss';
import User from '@icons/user.svg';
import { CommentProps } from '@organisms/Snippet/Snippet';
import { deleteComment } from '@services/commentService';

export const Comment = ({ comment, userId }: { comment: CommentProps; userId: number }) => {
  const handleDelete = () => {
    const fetchComment = async () => {
      try {
        await deleteComment(comment.id);
      } catch (error) {
        Modal.error({
          title: 'Error',
          content: error.response?.data?.message || 'Something went wrong',
        });
      }
    };

    fetchComment();
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
