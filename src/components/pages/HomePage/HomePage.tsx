import { Pagination } from 'antd';
import styles from './home-page.module.scss';
import Logo from '@icons/code.svg';
import { Snippet } from '@organisms/Snippet/Snippet';
import { useEffect } from 'react';
import { SpinApp } from '@atoms/SpinApp/SpinApp';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@store/store';
import { fetchSnippets, setCurrentPage, SnippetProps } from '@store/snippetSlice';

export const HomePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { snippets, loading, currentPage, totalPages } = useSelector(
    (state: RootState) => state.snippets
  );

  useEffect(() => {
    dispatch(fetchSnippets(currentPage));
  }, [dispatch, currentPage]);

  const onChange = (page: number) => {
    dispatch(setCurrentPage(page));
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
