import LoadingView from '@/components/common/exceptions/LoadingView';
import BaseResponsiveLayout from '@/components/common/layouts/BaseResponsiveLayout';
import { ROUTES } from '@/constants/routes';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CheckUserAgent() {
  const navigate = useNavigate();

  useEffect(() => {
    const redirectBasedOnDevice = () => {
      const isAdmin = true;
      const targetRoute = isAdmin ? ROUTES.LOGIN : ROUTES.STORE;
      navigate(targetRoute);
    };

    const timer = setTimeout(redirectBasedOnDevice, 1000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <BaseResponsiveLayout>
      <div className="flex h-screen items-center justify-center">
        <LoadingView />
      </div>
    </BaseResponsiveLayout>
  );
}
