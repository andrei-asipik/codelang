import { Button, Divider, Input, List, Modal } from 'antd';
import styles from './post-page.module.scss';
import { CommentProps, Snippet, SnippetProps } from '@organisms/Snippet/Snippet';
import { getSnippetById } from '@services/snippetService';
import { useEffect, useState } from 'react';
import { SpinApp } from '@atoms/SpinApp/SpinApp';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@store/store';
import { Comment } from '@organisms/Comment/Comment';
import { postComment } from '@services/commentService';

export const PostPage = () => {
  const [snippet, setSnippet] = useState<SnippetProps>();
  const [loading, setLoading] = useState(true);
  const [commentLoading, setCommentLoading] = useState(false);

  const { id: postId } = useParams();
  const user = useSelector((state: RootState) => state.user.user);
  const { id: userId } = user;
  const [text, setText] = useState('');

  useEffect(() => {
    const fetchSnippets = async () => {
      try {
        setLoading(true);
        const response = await getSnippetById(postId);
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

  const renderComment = (comment: CommentProps) => {
    return <Comment key={comment.id} comment={comment} userId={userId} />;
  };

  const submitComment = () => {
    const fetchComment = async () => {
      try {
        const data = { content: text, snippetId: Number(postId) };
        setCommentLoading(true);

        await postComment(data);
        const response = await getSnippetById(postId);
        setSnippet(response.data);
      } catch (error) {
        Modal.error({
          title: 'Error',
          content: error.response?.data?.message || 'Something went wrong',
        });
      } finally {
        setCommentLoading(false);
      }
    };

    fetchComment();
    setText('');
  };

  const sortedComments =
    snippet?.comments?.sort((a, b) => {
      return Number(b.id) - Number(a.id);
    }) || [];

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
            <Input.TextArea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Write comment..."
              required
            />
            <Button onClick={submitComment} type="primary" style={{ marginTop: 10 }}>
              Add comment
            </Button>
            <Divider />

            {commentLoading ? (
              <SpinApp />
            ) : (
              <List
                itemLayout="horizontal"
                dataSource={sortedComments}
                renderItem={renderComment}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};
