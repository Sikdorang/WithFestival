import LogoImage from '@/assets/images/img_logo.svg?react';
import BaseResponsiveLayout from '@/components/common/layouts/BaseResponsiveLayout';
import { ROUTES } from '@/constants/routes';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();

  return (
    <BaseResponsiveLayout>
      <div className="flex h-full w-full flex-col">
        <div className="flex flex-col items-center py-40">
          <div className="mb-14 flex-col gap-3">
            <LogoImage />
            <div className="text-mh-1 text-gray-400">관리자 로그인</div>
          </div>
          <p className="text-mh-1 mb-5 text-center text-gray-900">
            인증 번호를 입력해주세요
          </p>
          <input type="text" className="rounded-md border border-gray-300 px-4 py-2 mb-2" />
          <button className="rounded-md bg-gray-900 px-4 py-2 text-white" onClick={() => {
            navigate(ROUTES.WAITING);
          }}>
            로그인
          </button>
        </div>
      </div>
    </BaseResponsiveLayout>
  );
}
