import { Button, Divider, Input, List } from 'antd';
import styles from './question-page.module.scss';
import { ChangeEvent, useEffect, useState } from 'react';
import { SpinApp } from '@atoms';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState, addAnswer, AnswerProps, fetchQuestionById } from '@store';
import { Question, Answer } from '@organisms';
import { useAuth } from '@hooks';

export const QuestionPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { id: questionId } = useParams();
  const { isAuthenticated } = useAuth();
  const {
    currentQuestion: question,
    loading: questionLoading,
    answerLoading,
  } = useSelector((state: RootState) => state.questions);
  const [text, setText] = useState('');

  useEffect(() => {
    if (questionId) {
      dispatch(fetchQuestionById(questionId));
    }
  }, [dispatch, questionId]);

  const submitAnswer = () => {
    const payload = { questionId: questionId, content: text };

    if (text && questionId) {
      dispatch(addAnswer(payload));
      setText('');
    }
  };

  const handleTextChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  const answres = question?.answers || [];

  const sortedAnswers = [...(answres || [])].sort((a: AnswerProps, b: AnswerProps) => {
    return Number(b.id) - Number(a.id);
  });

  const renderAnswer = (answer: AnswerProps) => {
    return <Answer key={answer.id} answer={answer} />;
  };

  return (
    <div className={styles.container}>
      {questionLoading ? (
        <SpinApp />
      ) : (
        <>
          {question && (
            <div className={styles.question}>
              <Question key={question.id} question={question} withCode />
            </div>
          )}

          <div className={styles.answer}>
            <h2>Answers</h2>
            {isAuthenticated && (
              <>
                <Divider />
                <Input.TextArea
                  value={text}
                  onChange={handleTextChange}
                  placeholder="Write answer..."
                  required
                />
                <Button onClick={submitAnswer} type="primary" className={styles.button}>
                  Add answer
                </Button>
                <Divider />
              </>
            )}
            {answerLoading ? (
              <SpinApp />
            ) : (
              <List itemLayout="horizontal" dataSource={sortedAnswers} renderItem={renderAnswer} />
            )}
          </div>
        </>
      )}
    </div>
  );
};
