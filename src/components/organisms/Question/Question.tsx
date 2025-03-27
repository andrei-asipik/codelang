import styles from './question.module.scss';
import UserQuestion from '@icons/user-question.svg';
import Eye from '@icons/eye.svg';
import { useNavigate } from 'react-router';
import { QuestionProps } from '@store/questionSlice';
import { Button } from 'antd';
import CodeEditor from '@uiw/react-textarea-code-editor';

interface QuestionComponentProps {
  question: QuestionProps;
  withCode?: boolean;
}

export const Question = ({ question, withCode }: QuestionComponentProps) => {
  const navigate = useNavigate();

  const onClick = () => {
    navigate(`/question/${question.id}`);
  };

  return (
    <div className={styles.question}>
      <div className={styles.header}>
        <UserQuestion className={styles.icon} />
        <div className={styles.info}>
          <h2>{question.title}</h2>
          <span>
            asked by user: <strong>{question.user.username}</strong>
          </span>
        </div>
      </div>
      <p>{question.description}</p>

      {withCode ? (
        <>
          <h4>AttachedCode:</h4>
          <CodeEditor
            value={question.attachedCode}
            placeholder="No code..."
            disabled
            className={styles.code}
          />
        </>
      ) : (
        <Button
          shape="circle"
          type="text"
          icon={<Eye className={styles.icon} />}
          onClick={onClick}
          className={styles.button}
        />
      )}
    </div>
  );
};
