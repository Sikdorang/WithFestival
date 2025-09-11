import BaseResponsiveLayout from '@/components/common/BaseResponsiveLayout';
import LoadingView from '@/components/common/LoadingView';
import { ROUTES } from '@/constants/routes';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CheckUserAgent() {
  const navigate = useNavigate();

  useEffect(() => {
    const redirectBasedOnDevice = () => {
      const isAdmin = true;
      const targetRoute = isAdmin ? ROUTES.STORES.DETAIL('12') : ROUTES.LOGIN;
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
