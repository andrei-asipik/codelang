import styles from './snippet.module.scss';
import { User, Programming, Like, Dislike, Comment } from '@icons';
import { Button } from 'antd';
import CodeEditor from '@uiw/react-textarea-code-editor';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { AppDispatch, RootState, addSnippetMark, deleteSnippet, Mark, SnippetProps } from '@store';

interface SnippetComponentProps {
  snippet: SnippetProps;
}

export const Snippet = ({ snippet }: SnippetComponentProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const user = useSelector((state: RootState) => state.user.user);
  const activeUserId = String(user?.id);

  const updatedSnippet =
    useSelector((state: RootState) => state.snippets.snippets.find((s) => s.id === snippet.id)) ||
    snippet;

  const marks = updatedSnippet.marks;

  const likes = marks.filter((mark) => mark.type === 'like').length;
  const dislikes = marks.filter((mark) => mark.type === 'dislike').length;
  const hasLike = marks.some((mark) => mark.type === 'like' && mark.user.id === activeUserId);
  const hasDislike = marks.some((mark) => mark.type === 'dislike' && mark.user.id === activeUserId);

  const handleMarkClick = (mark: Mark['type']) => {
    if (isAuthenticated) {
      dispatch(addSnippetMark({ id: snippet.id, mark }));
    } else {
      navigate('/auth');
    }
  };

  const handleLikeClick = () => handleMarkClick('like');
  const handleDislikeClick = () => handleMarkClick('dislike');

  const isAuthor = updatedSnippet.user.id === activeUserId;

  const handleChangeClick = () => navigate(`/changesnippet/${snippet.id}`);
  const handleDeleteClick = () => {
    dispatch(deleteSnippet(snippet.id));
  };

  const handleCommentClick = () => {
    if (isAuthenticated) {
      navigate(`/post/${snippet.id}`);
    } else {
      navigate('/auth');
    }
  };

  return (
    <div className={styles.snippet}>
      <div className={styles.header}>
        <div>
          <User className={styles.icon} />
          {updatedSnippet.user.username}
        </div>
        <div>
          <Programming className={styles.icon} />
          {updatedSnippet.language}
        </div>
      </div>
      <CodeEditor
        value={updatedSnippet.code}
        language="javascript"
        placeholder="Enter code..."
        disabled
        className={styles.code}
      />
      <div className={styles.footer}>
        <div>
          {likes}
          <Button
            shape="circle"
            type="text"
            icon={<Like className={styles.icon} />}
            onClick={handleLikeClick}
            disabled={hasLike}
          />
          {dislikes}
          <Button
            shape="circle"
            type="text"
            icon={<Dislike className={styles.icon} />}
            onClick={handleDislikeClick}
            disabled={hasDislike}
          />
        </div>
        {isAuthor && (
          <div className={styles.buttons}>
            <Button type="text" onClick={handleChangeClick}>
              Change
            </Button>
            <Button type="text" onClick={handleDeleteClick}>
              Delete
            </Button>
          </div>
        )}
        <div>
          {updatedSnippet.comments.length}
          <Button
            shape="circle"
            type="text"
            icon={<Comment className={styles.icon} />}
            onClick={handleCommentClick}
          />
        </div>
      </div>
    </div>
  );
};
export { Mark };
