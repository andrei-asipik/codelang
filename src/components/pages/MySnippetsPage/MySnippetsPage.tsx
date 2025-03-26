import { Pagination } from 'antd';
import styles from './my-snippets-page.module.scss';
import { Snippet } from '@organisms/Snippet/Snippet';
import { useEffect } from 'react';
import { SpinApp } from '@atoms/SpinApp/SpinApp';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@store/store';
import { fetchSnippetsOfUser, SnippetProps } from '@store/snippetSlice';
import { useSearchParams } from 'react-router-dom';

export const MySnippetsPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { snippets, loading, totalPages } = useSelector((state: RootState) => state.snippets);
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  const user = useSelector((state: RootState) => state.user.user);
  const userId = String(user?.id);

  useEffect(() => {
    dispatch(fetchSnippetsOfUser({ userId, page: currentPage }));
  }, [dispatch, currentPage]);

  const onChange = (page: number) => {
    setSearchParams({ page: page.toString() });
  };

  return (
    <div className={styles.home}>
      <h1>My Snippets</h1>

      {loading ? (
        <SpinApp />
      ) : (
        <>
          <Pagination
            simple
            current={currentPage}
            defaultPageSize={10}
            total={totalPages}
            align="center"
            onChange={onChange}
          />
          {snippets.length > 0 ? (
            <div className={styles.snippetsList}>
              {snippets.map((snippet: SnippetProps) => (
                <>
                  <Snippet key={snippet.id} snippet={snippet} />
                </>
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
