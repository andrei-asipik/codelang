import { createBrowserRouter, Navigate } from 'react-router-dom';
import { ProtectedRoute } from '@atoms';
import { ErrorBoundary } from '@organisms';
import { AccountPage } from '@pages';
import { AuthPage } from '@pages';
import { ChangeSnippetPage } from '@pages';
import { CreateQuestionPage } from '@pages';
import { HomePage } from '@pages';
import { MySnippetsPage } from '@pages';
import { NotFoundPage } from '@pages';
import { PostPage } from '@pages';
import { PostSnippetPage } from '@pages';
import { QuestionPage } from '@pages';
import { QuestionsPage } from '@pages';
import { RegisterPage } from '@pages';
import { UserPage } from '@pages';
import { UsersPage } from '@pages';
import { GeneralLayout } from '@templates';
import { ChangeQuestionPage } from '@pages';

const protectedRoutes = [
  { path: '/post/:id', element: <PostPage /> },
  { path: '/account', element: <AccountPage /> },
  { path: '/postsnippet', element: <PostSnippetPage /> },
  { path: '/mysnippets', element: <MySnippetsPage /> },
  { path: '/changesnippet/:id', element: <ChangeSnippetPage /> },
  { path: '/changequestion/:id', element: <ChangeQuestionPage /> },
  { path: '/users', element: <UsersPage /> },
  { path: '/user/:id', element: <UserPage /> },
  { path: '/askquestion', element: <CreateQuestionPage /> },
  { path: '/questions', element: <QuestionsPage /> },
  { path: '/question/:id', element: <QuestionPage /> },
].map(({ path, element }) => ({
  path,
  element: <ProtectedRoute>{element}</ProtectedRoute>,
}));

export const router = createBrowserRouter([
  {
    element: <GeneralLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      { path: '/home', element: <HomePage /> },
      { path: '/register', element: <RegisterPage /> },
      { path: '/auth', element: <AuthPage /> },
      ...protectedRoutes,
      { path: '/', element: <Navigate to="/home" replace /> },
      { path: '*', element: <Navigate to="/404" replace /> },
      { path: '/404', element: <NotFoundPage /> },
    ],
  },
]);
