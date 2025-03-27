import { Button, Divider, Input } from 'antd';
import styles from './create-question-page.module.scss';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@store/store';
import CodeEditor from '@uiw/react-textarea-code-editor';
import { ChangeEvent, useState } from 'react';
import { createQuestion } from '@store/questionSlice';

export const CreateQuestionPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [code, setCode] = useState('');
  const [description, setDescription] = useState('');
  const [title, setTitle] = useState('');

  const payload = { title: title, description: description, code: code };

  const submitCode = () => {
    dispatch(createQuestion(payload));
    setTitle('');
    setDescription('');
    setCode('');
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
      <h1>Ask a question</h1>
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
          ASK QUESTION
        </Button>
      </div>
    </div>
  );
};
