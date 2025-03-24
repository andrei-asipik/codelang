import styles from './snippet.module.scss';
import User from '@icons/user.svg';
import Programming from '@icons/programming.svg';
import Like from '@icons/like.svg';
import Dislike from '@icons/dislike.svg';
import Comment from '@icons/comment.svg';
import { Button } from 'antd';
import CodeEditor from '@uiw/react-textarea-code-editor';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@store/store';
import { useNavigate } from 'react-router';
import { addSnippetMark, Mark, SnippetProps } from '@store/snippetSlice';

interface SnippetComponentProps {
  snippet: SnippetProps;
}

export const Snippet = ({ snippet }: SnippetComponentProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const user = useSelector((state: RootState) => state.user.user);
  const activeUserId = user?.id ? String(user.id) : '';

  const updatedSnippet =
    useSelector((state: RootState) => state.snippets.snippets.find((s) => s.id === snippet.id)) ||
    snippet;

  const marks = updatedSnippet.marks;

  const likes = marks.filter((m) => m.type === 'like').length;
  const dislikes = marks.filter((m) => m.type === 'dislike').length;
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
        // onChange={(evn) => setCode(evn.target.value)}
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
