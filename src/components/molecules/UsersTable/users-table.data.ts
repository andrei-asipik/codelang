import { TableProps } from 'antd';
import { UserData } from './UsersTable';

export const columns: TableProps<UserData>['columns'] = [
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
