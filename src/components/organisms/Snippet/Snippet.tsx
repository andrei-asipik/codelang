import styles from './snippet.module.scss';
import User from '@icons/user.svg';
import Programming from '@icons/programming.svg';
import Like from '@icons/like.svg';
import Dislike from '@icons/dislike.svg';
import Comment from '@icons/comment.svg';
import { Button, Modal } from 'antd';
import CodeEditor from '@uiw/react-textarea-code-editor';
import { useState } from 'react';
import { addSnippetsMark, getSnippetById } from '@services/snippetService';
import { useSelector } from 'react-redux';
import { RootState } from '@store/store';
import { useNavigate } from 'react-router';

interface User {
  id: string;
  username: string;
  role: string;
}

export interface Mark {
  id: string;
  type: 'like' | 'dislike';
  user: User;
}

export interface CommentProps {
  id: string;
  content: string;
  user: {
    id: string;
    username: string;
    role: string;
  };
}

export interface SnippetProps {
  id: string;
  code: string;
  language: string;
  marks: Mark[];
  user: User;
  comments: CommentProps[];
}

interface SnippetComponentProps {
  snippet: SnippetProps;
}

export const Snippet = ({ snippet }: SnippetComponentProps) => {
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  const [marks, setMarks] = useState<Mark[]>(snippet.marks);

  const user = useSelector((state: RootState) => state.user.user);
  const activeUserId = user?.id ? String(user.id) : '';

  const likes = marks.filter((m: { type: string }) => m.type === 'like').length;
  const dislikes = marks.filter((m: { type: string }) => m.type === 'dislike').length;

  const hasLike = marks.some((mark) => mark.type === 'like' && mark.user.id === activeUserId);
  const hasDislike = marks.some((mark) => mark.type === 'dislike' && mark.user.id === activeUserId);

  const addMark = async (mark: Mark['type']) => {
    try {
      await addSnippetsMark(snippet.id, mark);

      const updatedSnippet = await getSnippetById(snippet.id);
      setMarks(updatedSnippet.data.marks);
    } catch (error) {
      Modal.error({
        title: 'Error',
        content: error.response?.message || 'The reaction has already been recorded',
      });
    }
  };

  const onClick = (mark: Mark['type']) => {
    if (isAuthenticated) {
      addMark(mark);
    } else {
      navigate('/auth');
    }
  };

  const handleLikeClick = () => onClick('like');
  const handleDislikeClick = () => onClick('dislike');
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
          {snippet.user.username}
        </div>
        <div>
          <Programming className={styles.icon} />
          {snippet.language}
        </div>
      </div>
      <CodeEditor
        value={snippet.code}
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
          {snippet.comments.length}
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
