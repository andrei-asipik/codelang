import styles from './questions-page.module.scss';
import { Pagination } from 'antd';
import { useEffect } from 'react';
import { SpinApp } from '@atoms';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { fetchQuestions, QuestionProps, AppDispatch, RootState } from '@store';
import { Question } from '@organisms';

export const QuestionsPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { questions, loading, totalItems } = useSelector((state: RootState) => state.questions);

  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  useEffect(() => {
    dispatch(fetchQuestions(currentPage));
  }, [dispatch, currentPage]);

  const onChange = (page: number) => {
    setSearchParams({ page: page.toString() });
  };

  return (
    <div className={styles.container}>
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
          {questions.length > 0 ? (
            <div className={styles.snippetsList}>
              {questions.map((question: QuestionProps) => (
                <Question key={question.id} question={question} />
              ))}
            </div>
          ) : (
            <p>No questions available</p>
          )}
        </>
      )}
    </div>
  );
};
