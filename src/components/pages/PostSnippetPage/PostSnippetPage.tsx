import { Button, Divider, Select } from 'antd';
import styles from './post-snippet-page.module.scss';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@store/store';
import CodeEditor from '@uiw/react-textarea-code-editor';
import { ChangeEvent, useState } from 'react';
import { createSnippet } from '@store/snippetSlice';

export const PostSnippetPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState(null);

  const submitCode = () => {
    dispatch(createSnippet({ code: code, language: language }));
    setCode('');
    setLanguage(null);
  };

  const handleChange = (value: string) => {
    setLanguage(value);
  };

  const handleCodeChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setCode(event.target.value);
  };

  return (
    <div className={styles.container}>
      <h1>Create new snippet!</h1>
      <h2>Language of your snippet:</h2>
      <Select
        value={language}
        onChange={handleChange}
        showSearch
        placeholder="Select language"
        options={[
          { value: 'JavaScript', label: 'JavaScript' },
          { value: 'Python', label: 'Python' },
          { value: 'Java', label: 'Java' },
          { value: 'C/C++', label: 'C/C++' },
          { value: 'C#', label: 'C#' },
          { value: 'Go', label: 'Go' },
          { value: 'Kotlin', label: 'Kotlin' },
          { value: 'Ruby', label: 'Ruby' },
        ]}
      />

      <div className={styles.snippet}>
        <h2>Code of your snippet: </h2>
        <Divider />
        <CodeEditor
          value={code}
          language={language}
          placeholder="Write code..."
          onChange={handleCodeChange}
          className={styles.code}
          required
        />
        <Divider />
        <Button
          onClick={submitCode}
          type="primary"
          disabled={!language || !code.trim()}
          className={styles.button}
        >
          CREATE SNIPPET
        </Button>
      </div>
    </div>
  );
};
