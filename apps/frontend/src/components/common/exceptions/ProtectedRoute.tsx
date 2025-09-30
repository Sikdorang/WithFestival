import { useAuthStore } from '@/stores/authStore';
import { Navigate, Outlet } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';

export function ProtectedRoute() {
  const { isLoggedIn } = useAuthStore();

  if (!isLoggedIn) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  return <Outlet />;
}
