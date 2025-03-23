import { Button, Divider, List, Modal } from 'antd';
import styles from './post-page.module.scss';
import { Snippet, SnippetProps } from '@molecules/Snippet/Snippet';
import { getSnippetById } from '@services/snippetService';
import { useEffect, useState } from 'react';
import { SpinApp } from '@atoms/SpinApp/SpinApp';
import User from '@icons/user.svg';

export const PostPage = () => {
  const [snippet, setSnippet] = useState<SnippetProps>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSnippets = async () => {
      try {
        setLoading(true);
        const response = await getSnippetById('1');
        console.log(response.data);
        setSnippet(response.data);
      } catch (error) {
        Modal.error({
          title: 'Error',
          content: error.response?.data?.message || 'Something went wrong',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchSnippets();
  }, []);

  return (
    <div className={styles.home}>
      {loading ? (
        <SpinApp />
      ) : (
        <>
          {snippet && (
            <div className={styles.snippet}>
              <Snippet key={snippet.id} snippet={snippet} />
            </div>
          )}

          <div className={styles.comment}>
            <h2>Comments</h2>
            <Divider />
            <List
              itemLayout="horizontal"
              dataSource={snippet?.comments || []}
              renderItem={(comment) => {
                const canEditDelete = comment.user.id === '1'; // Проверка на ID 1

                return (
                  <List.Item
                    actions={
                      canEditDelete
                        ? [
                            <div className={styles.buttons} key={comment.id}>
                              <Button type="text">edit</Button>
                              <Button type="text">delete</Button>
                            </div>,
                          ]
                        : undefined
                    }
                  >
                    <List.Item.Meta
                      avatar={<User className={styles.icon} />}
                      title={<strong>{comment.user.username}</strong>}
                      description={comment.content}
                    />
                  </List.Item>
                );
              }}
            />
          </div>
        </>
      )}
    </div>
  );
};
