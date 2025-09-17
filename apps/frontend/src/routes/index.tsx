import ErrorBoundary from '@/components/common/ErrorBoundary';
import NotFoundView from '@/components/common/exceptions/NotFoundView';
import { TabBarLayout } from '@/components/common/layouts/TabBarLayout';
import { ROUTES } from '@/constants/routes';
import CheckUserType from '@/pages/CheckUserType';
import Games from '@/pages/Games';
import Login from '@/pages/Login';
import ManageMenuDetail from '@/pages/ManageMenuDetail';
import ManageWaiting from '@/pages/ManageWaiting';
import MenuBoard from '@/pages/MenuBoard';
import Order from '@/pages/Order';
import Ordering from '@/pages/Ordering';
import Store from '@/pages/Store';
import Waiting from '@/pages/Waiting';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/check/:encryptedParam?',
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
        path: ROUTES.MANAGE_WAITING,
        element: <ManageWaiting />,
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
  {
    path: ROUTES.WAITING,
    element: <Waiting />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: ROUTES.MENU_BOARD,
    element: <MenuBoard />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: ROUTES.MANAGE_MENUS.DETAIL(':menuId'),
    element: <ManageMenuDetail />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: ROUTES.GAMES.DETAIL(':gameId'),
    element: <Games />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: ROUTES.ORDERING,
    element: <Ordering />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: '/not-found',
    element: <NotFoundView />,
  },
  { path: '*', element: <NotFoundView /> },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
