import { Button, Divider, Input, List } from 'antd';
import styles from './post-page.module.scss';
import { Snippet } from '@organisms/Snippet/Snippet';
import { useEffect, useState } from 'react';
import { SpinApp } from '@atoms/SpinApp/SpinApp';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@store/store';
import { Comment } from '@organisms/Comment/Comment';
import { fetchSnippetById } from '@store/snippetSlice';
import { CommentProps } from '@store/snippetSlice';
import { addComment, fetchCommentsBySnippetId } from '@store/commentSlice';

export const PostPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { id: postId } = useParams();

  const user = useSelector((state: RootState) => state.user.user);
  const { id: userId } = user;

  const { currentSnippet: snippet, loading: snippetLoading } = useSelector(
    (state: RootState) => state.snippets
  );

  const { comments, loading: commentLoading } = useSelector((state: RootState) => state.comments);

  const [text, setText] = useState('');

  useEffect(() => {
    if (postId) {
      dispatch(fetchSnippetById(postId));
      dispatch(fetchCommentsBySnippetId(postId));
    }
  }, [dispatch, postId]);

  const submitComment = () => {
    if (text && postId) {
      dispatch(addComment({ snippetId: postId, content: text }));
      setText('');
    }
  };

  const sortedComments =
    comments?.sort((a: CommentProps, b: CommentProps) => {
      return Number(b.id) - Number(a.id);
    }) || [];

  const renderComment = (comment: CommentProps) => {
    return <Comment key={comment.id} comment={comment} userId={userId} />;
  };

  return (
    <div className={styles.home}>
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
