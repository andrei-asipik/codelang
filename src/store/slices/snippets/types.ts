export interface UserProps {
  id: string;
  username: string;
  role: string;
}

export interface MarkProps {
  id: string;
  type: 'like' | 'dislike';
  user: UserProps;
}

export interface CommentProps {
  id: string;
  content: string;
  user: {
    id: string;
    username: string;
    role: string;
  };
}

export interface SnippetProps {
  id: string;
  code: string;
  language: string;
  marks: MarkProps[];
  user: UserProps;
  comments: CommentProps[];
}

export interface SnippetState {
  snippets: SnippetProps[];
  loading: boolean;
  snippetUpdating: boolean;
  error: string | null;
  success: boolean;
  totalItems: number;
  currentSnippet: SnippetProps | null;
  commentLoading: boolean;
}
