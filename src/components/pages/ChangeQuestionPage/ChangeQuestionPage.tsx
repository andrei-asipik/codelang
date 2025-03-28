import { Button, Divider, Input } from 'antd';
import styles from './change-question-page.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@store/store';
import CodeEditor from '@uiw/react-textarea-code-editor';
import { ChangeEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { changeQuestion, fetchQuestionById } from '@store/questionSlice';

export const ChangeQuestionPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams();
  const { currentQuestion } = useSelector((state: RootState) => state.questions);
  const [code, setCode] = useState('');
  const [description, setDescription] = useState('');
  const [title, setTitle] = useState('');

  const payload = { title: title, description: description, attachedCode: code };

  useEffect(() => {
    if (id) {
      dispatch(fetchQuestionById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (currentQuestion) {
      setTitle(currentQuestion.title);
      setDescription(currentQuestion.description);
      setCode(currentQuestion.attachedCode);
    }
  }, [currentQuestion]);

  const submitCode = () => {
    dispatch(changeQuestion({ payload, questionId: id }));
  };

  const handleChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value);
  };

  const handleCodeChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setCode(event.target.value);
  };

  return (
    <div className={styles.container}>
      <h1>Change a question</h1>
      <Input value={title} onChange={handleChangeTitle} placeholder="Question title" />
      <Input.TextArea
        value={description}
        onChange={handleDescriptionChange}
        placeholder="Question description"
      />

      <div className={styles.snippet}>
        <CodeEditor
          value={code}
          placeholder="Attached code"
          onChange={handleCodeChange}
          className={styles.code}
          required
        />
        <Divider />
        <Button
          onClick={submitCode}
          type="primary"
          disabled={!title.trim() || !description.trim()}
          className={styles.button}
        >
          UPDATE QUESTION
        </Button>
      </div>
    </div>
  );
};
