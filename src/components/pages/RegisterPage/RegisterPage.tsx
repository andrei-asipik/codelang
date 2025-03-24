import { Input, Button, Form } from 'antd';
import styles from './register-page.module.scss';
import { Rule } from 'antd/es/form';
import { useNavigate } from 'react-router-dom';
import { RegisterData, registerUser } from '@store/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@store/store';
import { useEffect } from 'react';

export const RegisterPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  const onFinish = async (values: RegisterData) => {
    const userData = {
      username: values.username,
      password: values.password,
    };

    await dispatch(registerUser(userData));
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated]);

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
        labelCol={{ span: 12 }}
        wrapperCol={{ span: 26 }}
        onFinish={onFinish}
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
