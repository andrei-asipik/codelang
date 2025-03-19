import { Input, Button, FormProps, Form, Modal } from 'antd';
import styles from './password-change-form.module.scss';
import { Rule } from 'antd/es/form';
import { updatePassword, Password } from '@services/accountService';

export const PasswordChangeForm = () => {
  const onFinish: FormProps<Password>['onFinish'] = async (values) => {
    console.log(values);
    const password = {
      oldPassword: values.oldPassword,
      newPassword: values.newPassword,
    };
    try {
      await updatePassword(password);
      Modal.success({
        title: 'Success',
        content: 'Updated!',
      });
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Update error';
      Modal.error({
        title: 'Error',
        content: String(errorMessage),
      });
    }
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
      onFinish={onFinish}
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
        <Button type="primary" htmlType="submit">
          Change password
        </Button>
      </div>
    </Form>
  );
};
