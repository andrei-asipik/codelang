import { Card, Avatar } from 'antd';
import styles from './user-page.module.scss';
import { User } from '@icons';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { SpinApp } from '@atoms';
import { fetchUserStatisticById, AppDispatch, RootState } from '@store';

export const UserPage = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { id } = useParams();

  const { checkedUser, loading } = useSelector((state: RootState) => state.user);
  const { username, role, statistic } = checkedUser || {};

  useEffect(() => {
    if (id) {
      dispatch(fetchUserStatisticById(Number(id)));
    }
  }, [dispatch, id]);

  const statistics = statistic
    ? [
        { label: 'Rating', value: statistic.rating },
        { label: 'Snippets', value: statistic.snippetsCount },
        { label: 'Comments', value: statistic.commentsCount },
        { label: 'Likes', value: statistic.likesCount },
        { label: 'Dislikes', value: statistic.dislikesCount },
        { label: 'Questions', value: statistic.questionsCount },
        { label: 'Correct Answers', value: statistic.correctAnswersCount },
        { label: 'Regular Answers', value: statistic.regularAnswersCount },
      ]
    : [];

  return loading || !checkedUser ? (
    <SpinApp />
  ) : (
    <div className={styles.container}>
      <h1>
        User <span>{username}</span>
      </h1>
      <Card className={styles.profile}>
        <div className={styles.top}>
          <Avatar icon={<User />} className={styles.avatar} />
          <div className={styles.info}>
            <span className={styles.name}>{username}</span>
            <span>Id:{id}</span>
            <span>Role:{role}</span>
          </div>
        </div>
        <ul className={styles.statistics}>
          {statistics.map(({ label, value }) => (
            <li key={label}>
              <b>{label}:</b> {value}
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
};
