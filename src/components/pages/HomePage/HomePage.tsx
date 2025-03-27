import styles from './home-page.module.scss';
import { Pagination } from 'antd';
import { Code } from '@icons/index';
import { Snippet } from '@organisms/Snippet/Snippet';
import { useEffect } from 'react';
import { SpinApp } from '@atoms/SpinApp/SpinApp';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@store/store';
import { fetchSnippets, SnippetProps } from '@store/snippetSlice';
import { useSearchParams } from 'react-router-dom';

export const HomePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { snippets, loading, totalItems } = useSelector((state: RootState) => state.snippets);

  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  useEffect(() => {
    dispatch(fetchSnippets(currentPage));
  }, [dispatch, currentPage]);

  const onChange = (page: number) => {
    setSearchParams({ page: page.toString() });
  };

  return (
    <div className={styles.home}>
      <h1>{'Welcome to Codelang!'}</h1>
      <div>
        <Code className={styles.icon} />
      </div>
      {loading ? (
        <SpinApp />
      ) : (
        <>
          <Pagination
            simple
            current={currentPage}
            pageSize={10}
            total={totalItems}
            align="center"
            onChange={onChange}
          />
          {snippets.length > 0 ? (
            <div className={styles.snippetsList}>
              {snippets.map((snippet: SnippetProps) => (
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
