import { Modal, Pagination } from 'antd';
import styles from './home-page.module.scss';
import Logo from '@icons/code.svg';
import { Snippet, SnippetProps } from '@molecules/Snippet/Snippet';
import { getSnippets } from '@services/snippetService';
import { useEffect, useState } from 'react';
import { SpinApp } from '@atoms/SpinApp/SpinApp';

export const HomePage = () => {
  const [snippets, setSnippets] = useState<SnippetProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchSnippets = async () => {
      try {
        setLoading(true);
        const response = await getSnippets(currentPage);
        setSnippets(response.data.data);
        setTotalPages(response.data.meta.totalItems);
      } catch (error) {
        Modal.error({
          title: 'Error',
          content: error.response?.data?.message || 'Something went wrong',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchSnippets();
  }, [currentPage]);

  const onChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className={styles.home}>
      <h1>{'Welcome to Codelang!'}</h1>
      <div>
        <Logo className={styles.icon} />
      </div>
      <Pagination
        simple
        current={currentPage}
        defaultPageSize={10}
        total={totalPages}
        align="center"
        onChange={onChange}
      />
      {loading ? (
        <SpinApp />
      ) : (
        <>
          {snippets.length > 0 ? (
            <div className={styles.snippetsList}>
              {snippets.map((snippet) => (
                <Snippet key={snippet.id} snippet={snippet} />
              ))}
            </div>
          ) : (
            <p>No snippets available</p>
          )}
        </>
      )}
    </div>
  );
};
