import CtaButton from '@/components/common/buttons/CtaButton';
import TextInput from '@/components/common/inputs/TextInput';
import BaseResponsiveLayout from '@/components/common/layouts/BaseResponsiveLayout';
import { Banner } from '@/components/pages/login/Banner';
import { ROUTES } from '@/constants/routes';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const [code, setCode] = useState('');

  const handleDelete = () => {
    // 1. 세션 스토리지에서 삭제
    sessionStorage.removeItem('userData');

    console.log('데이터가 삭제되었습니다.');
  };

  return (
    <BaseResponsiveLayout>
      <div className="flex h-screen w-full flex-col items-center justify-center">
        <div className="flex h-full w-full max-w-sm min-w-sm flex-col items-center justify-center gap-8 py-40">
          <Banner />

          <TextInput
            label="인증 번호"
            placeholder="인증 번호를 입력해주세요"
            maxLength={6}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            limitHide
          />

          <CtaButton
            text="로그인"
            radius="_2xl"
            onClick={() => {
              navigate(ROUTES.MANAGE_WAITING);
            }}
          />
        </div>
        <CtaButton
          text="Table Id: 1, user Id 1: 테스트 라우팅"
          onClick={() =>
            navigate(
              '/U2FsdGVkX18XfbGNvHYA/3XWAWUR0UeF7/VN470df9IHqlFOCPTubX6tFWsuJoac',
            )
          }
        />

        <CtaButton
          text="user Id 1: 테스트 라우팅"
          onClick={() =>
            navigate('/U2FsdGVkX19KwR/LOqsPAIcJfOYT3lD+rmLWYlB/HYM=')
          }
        />
        <button onClick={handleDelete}>데이터 삭제하기</button>
      </div>
    </BaseResponsiveLayout>
  );
}
