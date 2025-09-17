import CtaButton from '@/components/common/buttons/CtaButton';
import TextInput from '@/components/common/inputs/TextInput';
import BaseResponsiveLayout from '@/components/common/layouts/BaseResponsiveLayout';
import { Banner } from '@/components/pages/login/Banner';
import { useLogin } from '@/hooks/useLogin';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useLogin();

  const [code, setCode] = useState('');

  const handleDelete = () => {
    sessionStorage.removeItem('userData');

    console.log('데이터가 삭제되었습니다.');
  };

  const handleLogin = () => {
    login(code);
  };

  return (
    <BaseResponsiveLayout>
      <div className="flex h-screen w-full flex-col items-center justify-center">
        <div className="flex h-full w-full max-w-sm min-w-sm flex-col items-center justify-center gap-8 px-6 py-40">
          <Banner />

          <TextInput
            label="인증 번호"
            placeholder="인증 번호를 입력해주세요"
            maxLength={6}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            limitHide
          />

          <CtaButton text="로그인" radius="_2xl" onClick={handleLogin} />
        </div>

        <CtaButton
          text="테스트 라우팅"
          onClick={() =>
            navigate(`/check/U2FsdGVkX1%2BBUhhtRtvUZ6ua4oYsOwl89zsHYQnByTU%3D`)
          }
        />
        <button onClick={handleDelete}>데이터 삭제하기</button>
      </div>
    </BaseResponsiveLayout>
  );
}
