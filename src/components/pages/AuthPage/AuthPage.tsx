import { Input, Button, FormProps, Form, Modal } from 'antd';
import styles from './auth-page.module.scss';
import { loginUser, RegisterData } from '@services/authService';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

export const AuthPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit: FormProps<RegisterData>['onFinish'] = async (values) => {
    const userData = {
      username: values.username,
      password: values.password,
    };

    try {
      await loginUser(userData, dispatch);

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
