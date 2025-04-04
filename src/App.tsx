import { RouterProvider } from 'react-router-dom';
import { router } from './routes/router';
import './styles/global.scss';

export const App = () => <RouterProvider router={router} />;
