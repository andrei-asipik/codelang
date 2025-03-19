import { Input, Button, FormProps, Form, Modal } from 'antd';
import styles from './username-change-form.module.scss';
import { RegisterData } from '@services/authService';
import { updateName } from '@services/accountService';

export const UserNameChangeForm = () => {
  const onFinishChangeName: FormProps<RegisterData>['onFinish'] = async (values) => {
    const userData = {
      username: values.username,
    };
    try {
      await updateName(userData);
      Modal.success({
        title: 'Success',
        content: 'Updated!',
      });
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Registration error';
      Modal.error({
        title: 'Error',
        content: String(errorMessage),
      });
    }
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
        <Button type="primary" htmlType="submit">
          Save
        </Button>
      </div>
    </Form>
  );
};
