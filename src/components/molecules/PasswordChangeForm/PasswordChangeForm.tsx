import { Input, Button, Form } from 'antd';
import styles from './password-change-form.module.scss';
import { Rule } from 'antd/es/form';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@store/store';
import { clearError, updatePassword, UpdatePasswordData } from '@store/userSlice';

export const PasswordChangeForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: RootState) => state.user);
  const [form] = Form.useForm();

  const onFinishChangePassword = async (values: UpdatePasswordData) => {
    dispatch(clearError());

    const passwordData: UpdatePasswordData = {
      oldPassword: values.oldPassword,
      newPassword: values.newPassword,
    };
    await dispatch(updatePassword(passwordData));
    form.resetFields();
  };

  const validateConfirmPassword: Rule = ({ getFieldValue }) => ({
    validator(_, value) {
      if (!value || getFieldValue('newPassword') === value) {
        return Promise.resolve();
      }
      return Promise.reject(new Error('The new password that you entered do not match!'));
    },
  });

  return (
    <Form
      name="change password"
      onFinish={onFinishChangePassword}
      autoComplete="off"
      className={styles.form}
      layout="vertical"
    >
      <Form.Item
        name="oldPassword"
        label="Change your password:"
        rules={[
          {
            min: 5,
            message: 'Name must be longer than or equal to 5 characters',
          },
        ]}
      >
        <Input placeholder="Old password" />
      </Form.Item>

      <Form.Item
        name="newPassword"
        rules={[
          {
            pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{5,}$/,
            message:
              'Password must contain at least one lowercase letter, one uppercase letter, one number and one symbol',
          },
        ]}
      >
        <Input.Password placeholder="New password" />
      </Form.Item>

      <Form.Item
        name="confirm password"
        dependencies={['password']}
        rules={[
          {
            required: true,
            message: 'Please confirm your password',
          },
          validateConfirmPassword,
        ]}
      >
        <Input.Password placeholder="Confirm password" />
      </Form.Item>

      <div className={styles.button}>
        <Button type="primary" htmlType="submit" loading={loading}>
          Change password
        </Button>
      </div>
    </Form>
  );
};
