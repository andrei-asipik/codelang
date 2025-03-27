import { ProtectedRoute } from '@atoms/ProtectedRoute/ProtectedRoute';
import { ErrorBoundary } from '@organisms/ErrorBoundary/ErrorBoundary';
import { AccountPage } from '@pages/AccountPage/AccountPage';
import { AuthPage } from '@pages/AuthPage/AuthPage';
import { ChangeSnippetPage } from '@pages/ChangeSnippetPage/ChangeSnippetPage';
import { CreateQuestionPage } from '@pages/CreateQuesionPage/CreateQuestionPage';
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
import { RedirectFunction, createBrowserRouter, redirect } from 'react-router-dom';

type RedirectType = ReturnType<RedirectFunction>;

export const router = createBrowserRouter([
  {
    element: <GeneralLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      { path: '/', element: <HomePage /> },
      {
        path: '/post/:id',
        element: (
          <ProtectedRoute>
            <PostPage />
          </ProtectedRoute>
        ),
      },
      { path: '/register', element: <RegisterPage /> },
      { path: '/auth', element: <AuthPage /> },
      {
        path: '/account',
        element: (
          <ProtectedRoute>
            <AccountPage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/postsnippet',
        element: (
          <ProtectedRoute>
            <PostSnippetPage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/mysnippets',
        element: (
          <ProtectedRoute>
            <MySnippetsPage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/changesnippet/:id',
        element: (
          <ProtectedRoute>
            <ChangeSnippetPage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/users',
        element: (
          <ProtectedRoute>
            <UsersPage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/user/:id',
        element: (
          <ProtectedRoute>
            <UserPage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/questions',
        element: <QuestionsPage />,
      },
      {
        path: '/question/:id',
        element: <QuestionPage />,
      },
      {
        path: '/askquestion',
        element: (
          <ProtectedRoute>
            <CreateQuestionPage />
          </ProtectedRoute>
        ),
      },
      {
        path: '*',
        loader: (): RedirectType => redirect('/404'),
      },
      {
        path: '/404',
        element: <NotFoundPage />,
      },
    ],
  },
]);
