import { Input, Button, Form } from 'antd';
import styles from './username-change-form.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@store/store';
import { UpdateNameData, updateUserName } from '@store/userSlice';

export const UserNameChangeForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: RootState) => state.user);

  const onFinishChangeName = async (values: UpdateNameData) => {
    await dispatch(updateUserName({ username: values.username }));
  };

  return (
    <Form
      name="change username"
      onFinish={onFinishChangeName}
      autoComplete="off"
      className={styles.form}
      layout="vertical"
    >
      <Form.Item
        name="username"
        label="Change your username:"
        rules={[
          {
            min: 5,
            message: 'Name must be longer than or equal to 5 characters',
          },
        ]}
      >
        <Input placeholder="New username" />
      </Form.Item>

      <div className={styles.button}>
        <Button type="primary" htmlType="submit" loading={loading}>
          Save
        </Button>
      </div>
    </Form>
  );
};
