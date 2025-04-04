import { useEffect } from 'react';
import { Modal } from 'antd';

export const useNotifications = (success?: boolean, error?: string) => {
  useEffect(() => {
    if (error) {
      Modal.error({
        title: 'Error',
        content: error,
      });
    }
  }, [error]);

  useEffect(() => {
    if (success) {
      Modal.success({
        title: 'Success',
        content: 'Action completed successfully!',
      });
    }
  }, [success]);
};
