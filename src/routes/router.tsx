import { ProtectedRoute } from '@atoms/ProtectedRoute/ProtectedRoute';
import { ErrorBoundary } from '@organisms/ErrorBoundary/ErrorBoundary';
import { AccountPage } from '@pages/AccountPage/AccountPage';
import { AuthPage } from '@pages/AuthPage/AuthPage';
import { HomePage } from '@pages/HomePage/HomePage';
import { NotFoundPage } from '@pages/NotFoundPage/NotFoundPage';
import { PostPage } from '@pages/PostPage/PostPage';
import { RegisterPage } from '@pages/RegisterPage/RegisterPage';
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
