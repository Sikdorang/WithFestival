import ErrorBoundary from '@/components/common/ErrorBoundary';
import NotFoundView from '@/components/common/exceptions/NotFoundView';
import { TabBarLayout } from '@/components/common/layouts/TabBarLayout';
import { ROUTES } from '@/constants/routes';
import CheckUserType from '@/pages/CheckUserType';
import Login from '@/pages/Login';
import Order from '@/pages/Order';
import Store from '@/pages/Store';
import Waiting from '@/pages/Waiting';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: ROUTES.ROOT,
    element: <CheckUserType />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: ROUTES.LOGIN,
    element: <Login />,
    errorElement: <ErrorBoundary />,
  },
  {
    element: <TabBarLayout />, 
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: ROUTES.WAITING, 
        element: <Waiting />,
      },
      {
        path: ROUTES.ORDER, 
        element: <Order />,
      },
      {
        path: ROUTES.STORE, 
        element: <Store />,
      },
    ],
  },
  { path: '*', element: <NotFoundView /> },
]);

export default function Router() {
  return <RouterProvider router={router}/>;
}
