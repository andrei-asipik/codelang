import { Input, Button, FormProps, Form, Modal } from 'antd';
import styles from './auth-page.module.scss';
import { loginUser, RegisterData } from '@services/authService';
import { useNavigate } from 'react-router-dom';

export const AuthPage = () => {
  const navigate = useNavigate();

  const onFinish: FormProps<RegisterData>['onFinish'] = async (values) => {
    const userData = {
      username: values.username,
      password: values.password,
    };

    try {
      await loginUser(userData);

      Modal.success({
        title: 'Success',
        content: 'Authorization was successful!',
      });

      navigate('/');
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Authorization error';

      Modal.error({
        title: 'Error',
        content: String(errorMessage),
      });
    }
  };

  const onFinishFailed: FormProps<RegisterData>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className={styles.container}>
      <h2>Authorization</h2>
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
