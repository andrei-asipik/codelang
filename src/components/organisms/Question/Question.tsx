import styles from './question.module.scss';
import { UserQuestion, Eye } from '@icons/index';
import { useNavigate } from 'react-router';
import { deleteQuestion, QuestionProps } from '@store/questionSlice';
import { Button } from 'antd';
import CodeEditor from '@uiw/react-textarea-code-editor';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@store/store';

interface QuestionComponentProps {
  question: QuestionProps;
  withCode?: boolean;
}

export const Question = ({ question, withCode }: QuestionComponentProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const user = useSelector((state: RootState) => state.user.user);
  const { id: userId } = user;

  const handleDelete = () => {
    dispatch(deleteQuestion(question.id));
  };

  const handleChange = () => {
    navigate(`/changequestion/${question.id}`);
  };

  const canUpdate = question.user?.id === String(userId);

  const onClick = () => {
    navigate(`/question/${question.id}`);
  };

  return (
    <div className={styles.question}>
      <div className={styles.header}>
        <UserQuestion className={styles.icon} />
        <div className={styles.info}>
          <div>
            <h2>{question.title}</h2>
            <span>
              asked by user: <b>{question.user.username}</b>
            </span>
          </div>
          {canUpdate && (
            <div className={styles.buttons}>
              <Button type="text" onClick={handleDelete} className={styles.button}>
                delete
              </Button>
              <Button type="text" onClick={handleChange} className={styles.button}>
                change
              </Button>
            </div>
          )}
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
