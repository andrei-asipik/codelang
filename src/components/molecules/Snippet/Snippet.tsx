import styles from './snippet.module.scss';
import User from '@icons/user.svg';
import Programming from '@icons/programming.svg';
import Like from '@icons/like.svg';
import Dislike from '@icons/dislike.svg';
import Comment from '@icons/comment.svg';
import { Button } from 'antd';
import CodeEditor from '@uiw/react-textarea-code-editor';
import { useState } from 'react';

interface User {
  id: string;
  username: string;
  role: string;
}

interface Mark {
  id: string;
  type: 'like' | 'dislike';
  user: User;
}

interface Comment {
  id: string;
  content: string;
}

export interface SnippetProps {
  id: string;
  code: string;
  language: string;
  marks: Mark[];
  user: User;
  comments: Comment[];
}

interface SnippetComponentProps {
  snippet: SnippetProps;
}

export const Snippet = ({ snippet }: SnippetComponentProps) => {
  const [code, setCode] = useState(snippet.code);

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
        value={code}
        language="javascript"
        placeholder="Введите код..."
        onChange={(evn) => setCode(evn.target.value)}
        disabled
        className={styles.code}
      />
      <div className={styles.footer}>
        <div>
          {snippet.marks.filter((m: { type: string }) => m.type === 'like').length}
          <Button shape="circle" type="text" icon={<Like className={styles.icon} />} />
          {snippet.marks.filter((m: { type: string }) => m.type === 'dislike').length}
          <Button shape="circle" type="text" icon={<Dislike className={styles.icon} />} />
        </div>
        <div>
          {snippet.comments.length}
          <Button shape="circle" type="text" icon={<Comment className={styles.icon} />} />
        </div>
      </div>
    </div>
  );
};
