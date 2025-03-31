import { Input, Button, Form } from 'antd';
import styles from './auth-page.module.scss';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch, loginUser, RegisterData } from '@store';
import { useEffect } from 'react';
import { useAuth } from '@hooks';

export const AuthPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated } = useAuth();

  const onSubmit = async (values: RegisterData) => {
    await dispatch(loginUser(values));
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated]);

  return (
    <div className={styles.container}>
      <h2>Authorization</h2>
      <Form
        name="basic"
        labelCol={{ span: 10 }}
        wrapperCol={{ span: 26 }}
        onFinish={onSubmit}
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
        or &nbsp; <a href="/register"> Register now!</a>
      </div>
    </div>
  );
};
