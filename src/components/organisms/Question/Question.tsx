import styles from './question.module.scss';
import UserQuestion from '@icons/user-question.svg';

// import { useNavigate } from 'react-router';
import { QuestionProps } from '@store/questionSlice';
import { Button } from 'antd';

interface QuestionComponentProps {
  question: QuestionProps;
}

const onClick = () => {
  console.log('click');
};

export const Question = ({ question }: QuestionComponentProps) => {
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

      <Button
        shape="circle"
        type="text"
        icon={<UserQuestion className={styles.icon} />}
        onClick={onClick}
        className={styles.button}
      />
    </div>
  );
};
