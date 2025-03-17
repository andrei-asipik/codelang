import { ErrorBoundary } from '@organisms/ErrorBoundary/ErrorBoundary';
import { HomePage } from '@pages/HomePage/HomePage';
import { NotFoundPage } from '@pages/NotFoundPage/NotFoundPage';
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
      { path: '/register', element: <RegisterPage /> },
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
