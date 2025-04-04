import { Button, Divider, Select } from 'antd';
import styles from './change-snippet-page.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import CodeEditor from '@uiw/react-textarea-code-editor';
import { ChangeEvent, useEffect, useState } from 'react';
import { AppDispatch, RootState, changeSnippet, fetchSnippetById } from '@store';
import { useParams } from 'react-router-dom';

export const ChangeSnippetPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams();
  const { currentSnippet } = useSelector((state: RootState) => state.snippets);

  const [code, setCode] = useState('');
  const [language, setLanguage] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      dispatch(fetchSnippetById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (currentSnippet) {
      setCode(currentSnippet.code);
      setLanguage(currentSnippet.language);
    }
  }, [currentSnippet]);

  const submitCode = () => {
    if (id && code && language) {
      dispatch(changeSnippet({ snippetId: id, code, language }));
    }
  };

  const handleChange = (value: string) => {
    setLanguage(value);
  };

  const handleCodeChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setCode(event.target.value);
  };

  const languageOptions = [
    { value: 'JavaScript', label: 'JavaScript' },
    { value: 'Python', label: 'Python' },
    { value: 'Java', label: 'Java' },
    { value: 'C/C++', label: 'C/C++' },
    { value: 'C#', label: 'C#' },
    { value: 'Go', label: 'Go' },
    { value: 'Kotlin', label: 'Kotlin' },
    { value: 'Ruby', label: 'Ruby' },
  ];

  return (
    <div className={styles.container}>
      <h1>Change your snippet!</h1>
      <h2>Language of your snippet:</h2>
      <Select
        value={language}
        onChange={handleChange}
        showSearch
        placeholder="Select language"
        options={languageOptions}
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
          UPDATE SNIPPET
        </Button>
      </div>
    </div>
  );
};
