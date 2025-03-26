import styles from './users-page.module.scss';
import { useEffect } from 'react';
import { SpinApp } from '@atoms/SpinApp/SpinApp';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@store/store';
import { fetchUsers } from '@store/userSlice';
import { UsersTable } from '@molecules/UsersTable/UsersTable';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Pagination } from 'antd';

export const UsersPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { users, loading, totalItems } = useSelector((state: RootState) => state.user);

  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  useEffect(() => {
    dispatch(fetchUsers({ page: currentPage }));
  }, [dispatch, currentPage]);

  const dataSource = users.map((user) => ({
    key: user.id.toString(),
    id: user.id,
    username: user.username,
  }));

  const handleRowClick = (record: { id: number }) => {
    navigate(`/user/${record.id}`);
  };

  const onChange = (page: number) => {
    setSearchParams({ page: page.toString() });
  };

  return (
    <div className={styles.container}>
      <h1>Codelang users</h1>

      {loading ? (
        <SpinApp />
      ) : (
        <div className={styles.content}>
          <Pagination
            simple
            current={currentPage}
            total={totalItems}
            pageSize={20}
            showSizeChanger={false}
            align="center"
            onChange={onChange}
          />
          {users.length > 0 ? (
            <UsersTable dataSource={dataSource} onRowClick={handleRowClick} />
          ) : (
            <p>No users available</p>
          )}
        </div>
      )}
    </div>
  );
};
