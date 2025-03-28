import { createBrowserRouter, Navigate } from 'react-router-dom';
import { ProtectedRoute } from '@atoms/ProtectedRoute/ProtectedRoute';
import { ErrorBoundary } from '@organisms/ErrorBoundary/ErrorBoundary';
import { AccountPage } from '@pages/AccountPage/AccountPage';
import { AuthPage } from '@pages/AuthPage/AuthPage';
import { ChangeSnippetPage } from '@pages/ChangeSnippetPage/ChangeSnippetPage';
import { CreateQuestionPage } from '@pages/CreateQuestionPage/CreateQuestionPage';
import { HomePage } from '@pages/HomePage/HomePage';
import { MySnippetsPage } from '@pages/MySnippetsPage/MySnippetsPage';
import { NotFoundPage } from '@pages/NotFoundPage/NotFoundPage';
import { PostPage } from '@pages/PostPage/PostPage';
import { PostSnippetPage } from '@pages/PostSnippetPage/PostSnippetPage';
import { QuestionPage } from '@pages/QuestionPage/QuestionPage';
import { QuestionsPage } from '@pages/QuestionsPage/QuestionsPage';
import { RegisterPage } from '@pages/RegisterPage/RegisterPage';
import { UserPage } from '@pages/UserPage/UserPage';
import { UsersPage } from '@pages/UsersPage/UsersPage';
import { GeneralLayout } from '@templates/GeneralLayout/GeneralLayout';
import { ChangeQuestionPage } from '@pages/ChangeQuestionPage/ChangeQuestionPage';

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
      { path: '/questions', element: <QuestionsPage /> },
      { path: '/question/:id', element: <QuestionPage /> },
      ...protectedRoutes,
      { path: '/', element: <Navigate to="/home" replace /> },
      { path: '*', element: <Navigate to="/404" replace /> },
      { path: '/404', element: <NotFoundPage /> },
    ],
  },
]);
