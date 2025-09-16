//import socket from '@/apis/socket';
import LoadingView from '@/components/common/exceptions/LoadingView';
import BaseResponsiveLayout from '@/components/common/layouts/BaseResponsiveLayout';
import { ROUTES } from '@/constants/routes';
import { decryptJson } from '@/utils/crypto';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { KEYS } from '../constants/storage';

export default function CheckUserType() {
  const navigate = useNavigate();
  const params = useParams();
  const encryptedPath = params['*'];

  //console.log(socket);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!encryptedPath) {
        navigate(ROUTES.LOGIN, { replace: true });
        return;
      }

      const decryptedData = decryptJson(encryptedPath);

      if (!decryptedData || !decryptedData.userId) {
        navigate('/not-found', { replace: true });
        return;
      }

      sessionStorage.setItem('userData', JSON.stringify(decryptedData));

      if ('tableId' in decryptedData) {
        localStorage.setItem(KEYS.IS_PREVIEW, '0');
        navigate(ROUTES.MENU_BOARD, {
          replace: true,
          state: { userData: decryptedData },
        });
      } else {
        navigate(ROUTES.WAITING, {
          replace: true,
          state: { userData: decryptedData },
        });
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [navigate, encryptedPath]);

  return (
    <BaseResponsiveLayout>
      <div className="flex h-screen items-center justify-center">
        <LoadingView />
      </div>
    </BaseResponsiveLayout>
  );
}
