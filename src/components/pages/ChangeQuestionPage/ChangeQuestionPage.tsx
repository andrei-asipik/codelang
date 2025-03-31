import { Button, Divider, Input } from 'antd';
import styles from './change-question-page.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import CodeEditor from '@uiw/react-textarea-code-editor';
import { ChangeEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AppDispatch, RootState, changeQuestion, fetchQuestionById } from '@store';

export const ChangeQuestionPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams();
  const { currentQuestion } = useSelector((state: RootState) => state.questions);
  const [questionData, setQuestionData] = useState({
    title: '',
    description: '',
    attachedCode: '',
  });

  useEffect(() => {
    if (id) {
      dispatch(fetchQuestionById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (currentQuestion) {
      setQuestionData({
        title: currentQuestion.title,
        description: currentQuestion.description,
        attachedCode: currentQuestion.attachedCode,
      });
    }
  }, [currentQuestion]);

  const submitCode = () => {
    if (!id) return;
    dispatch(changeQuestion({ payload: questionData, questionId: id }));
  };

  const handleChange =
    (field: keyof typeof questionData) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setQuestionData((prev) => ({
        ...prev,
        [field]: event.target.value,
      }));
    };

  return (
    <div className={styles.container}>
      <h1>Change a question</h1>
      <Input
        value={questionData.title}
        onChange={handleChange('title')}
        placeholder="Question title"
      />
      <Input.TextArea
        value={questionData.description}
        onChange={handleChange('description')}
        placeholder="Question description"
      />

      <div className={styles.snippet}>
        <CodeEditor
          value={questionData.attachedCode}
          placeholder="Attached code"
          onChange={handleChange('attachedCode')}
          className={styles.code}
          required
        />
        <Divider />
        <Button
          onClick={submitCode}
          type="primary"
          disabled={!questionData.title.trim() || !questionData.description.trim()}
          className={styles.button}
        >
          UPDATE QUESTION
        </Button>
      </div>
    </div>
  );
};
