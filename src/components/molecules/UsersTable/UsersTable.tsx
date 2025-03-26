import { Table, TableProps } from 'antd';
import styles from './users-table.module.scss';

interface UserData {
  key: string;
  id: number;
  username: string;
}

interface UsersTableProps {
  dataSource: UserData[];
  onRowClick: (record: UserData) => void;
}

const columns: TableProps<UserData>['columns'] = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Username',
    dataIndex: 'username',
    key: 'username',
  },
];

export const UsersTable = ({ dataSource, onRowClick }: UsersTableProps) => {
  const getRowProps = (record: UserData) => {
    return {
      onClick: () => onRowClick(record),
    };
  };

  return (
    <Table<UserData>
      columns={columns}
      dataSource={dataSource}
      pagination={false}
      onRow={getRowProps}
      className={styles.list}
      rowClassName={styles.row}
    />
  );
};
