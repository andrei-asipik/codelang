import { Button, Divider, Input, List } from 'antd';
import styles from './post-page.module.scss';
import { Snippet, Comment } from '@organisms';
import { ChangeEvent, useEffect, useState } from 'react';
import { SpinApp } from '@atoms';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState, CommentProps, fetchSnippetById, addComment } from '@store';

export const PostPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { id: postId } = useParams();

  const {
    currentSnippet: snippet,
    loading: snippetLoading,
    commentLoading,
  } = useSelector((state: RootState) => state.snippets);

  const [text, setText] = useState('');

  useEffect(() => {
    if (postId) {
      dispatch(fetchSnippetById(postId));
    }
  }, [dispatch, postId]);

  const submitComment = () => {
    if (text && postId) {
      dispatch(addComment({ snippetId: postId, content: text }));
      setText('');
    }
  };

  const handleTextChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  const comments = snippet?.comments || [];

  const sortedComments = [...(comments || [])].sort((a: CommentProps, b: CommentProps) => {
    return Number(b.id) - Number(a.id);
  });

  const renderComment = (comment: CommentProps) => {
    return <Comment key={comment.id} comment={comment} snippetId={snippet?.id} />;
  };

  return (
    <div className={styles.container}>
      {snippetLoading ? (
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
              onChange={handleTextChange}
              placeholder="Write comment..."
              required
            />
            <Button onClick={submitComment} type="primary" className={styles.button}>
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
