import { Input, Button, FormProps, Form, Modal } from 'antd';
import styles from './register-page.module.scss';
import { Rule } from 'antd/es/form';
import { RegisterData, registerUser } from '@services/authService';

export const RegisterPage = () => {
  const onFinish: FormProps<RegisterData>['onFinish'] = async (values) => {
    const userData = {
      username: values.username,
      password: values.password,
    };

    try {
      await registerUser(userData);

      Modal.success({
        title: 'Success',
        content: 'Register was successful!',
      });
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Registration error';

      Modal.error({
        title: 'Error',
        content: String(errorMessage),
      });
    }
  };

  const onFinishFailed: FormProps<RegisterData>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const validateConfirmPassword: Rule = ({ getFieldValue }) => ({
    validator(_, value) {
      if (!value || getFieldValue('password') === value) {
        return Promise.resolve();
      }
      return Promise.reject(new Error('The new password that you entered do not match!'));
    },
  });

  return (
    <div className={styles.container}>
      <h2>Registration</h2>
      <Form
        name="basic"
        labelCol={{ span: 10 }}
        wrapperCol={{ span: 26 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        className={styles.form}
      >
        <Form.Item
          name="username"
          label="Username"
          rules={[
            {
              required: true,
              message: 'Please input your name',
            },
            {
              min: 5,
              message: 'Name must be longer than or equal to 5 characters',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: 'Please input your password',
            },
            {
              pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{5,}$/,
              message:
                'Password must contain at least one lowercase letter, one uppercase letter, one number and one symbol',
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please confirm your password',
            },
            validateConfirmPassword,
          ]}
        >
          <Input.Password />
        </Form.Item>

        <div className={styles.button}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </div>
      </Form>
      <div className={styles.link}>
        Already have an account? &nbsp;<a href="/auth">Sign In</a>
      </div>
    </div>
  );
};
