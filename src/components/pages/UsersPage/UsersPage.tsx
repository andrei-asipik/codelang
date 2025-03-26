import styles from './users-page.module.scss';
import { useEffect } from 'react';
import { SpinApp } from '@atoms/SpinApp/SpinApp';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@store/store';
import { fetchUsers } from '@store/userSlice';
import { UsersTable } from '@molecules/UsersTable/UsersTable';
import { useNavigate } from 'react-router-dom';

export const UsersPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { users, loading } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const dataSource = users.map((user) => ({
    key: user.id.toString(),
    id: user.id,
    username: user.username,
  }));

  const handleRowClick = (record: { id: number }) => {
    navigate(`/user/${record.id}`);
  };

  return (
    <div className={styles.container}>
      <h1>{'Codelang users'}</h1>

      {loading ? (
        <SpinApp />
      ) : (
        <>
          {users.length > 0 ? (
            <UsersTable dataSource={dataSource} onRowClick={handleRowClick} />
          ) : (
            <p>No users available</p>
          )}
        </>
      )}
    </div>
  );
};
