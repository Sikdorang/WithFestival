import ErrorBoundary from '@/components/common/ErrorBoundary';
import NotFoundView from '@/components/common/NotFoundView';
import { ROUTES } from '@/constants/routes';
import CheckUserType from '@/pages/CheckUserType';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
const router = createBrowserRouter([
  {
    path: ROUTES.ROOT,
    element: <CheckUserType />,
    errorElement: <ErrorBoundary />,
  },
  // {
  //   path: ROUTES.STORES.DETAIL(),
  //   element: <Store />,
  //   errorElement: <ErrorBoundary />,
  // },

  { path: '*', element: <NotFoundView /> },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
