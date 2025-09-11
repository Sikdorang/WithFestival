import LogoImage from '@/assets/images/img_logo.svg';
import BaseResponsiveLayout from '@/components/common/BaseResponsiveLayout';

export default function Login() {
  return (
    <BaseResponsiveLayout>
      <div className="flex h-full w-full flex-col">
        <div className="flex flex-col items-center py-40">
          <div className="mb-14 flex items-end gap-3">
            <LogoImage />
            <div className="text-mh-1 text-gray-400">손님용 메뉴판 로그인</div>
          </div>
          <p className="text-mh-1 mb-5 text-center text-gray-900">
            PIN 번호
            <br />
            5자리를 입력해주세요
          </p>
        </div>
      </div>
    </BaseResponsiveLayout>
  );
}
