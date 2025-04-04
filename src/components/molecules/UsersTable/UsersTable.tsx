import { Table } from 'antd';
import styles from './users-table.module.scss';
import { columns } from './users-table.data';

export interface UserData {
  key: string;
  id: number;
  username: string;
}

interface UsersTableProps {
  dataSource: UserData[];
  onRowClick: (record: UserData) => void;
}

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
      bordered
    />
  );
};
