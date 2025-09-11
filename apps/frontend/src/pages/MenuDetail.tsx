import { LuArrowLeft, LuCamera } from 'react-icons/lu';
import { useNavigate } from 'react-router-dom';

// 재사용을 위한 인풋 컴포넌트
function FormInput({
  label,
  placeholder,
}: {
  label: string;
  placeholder: string;
}) {
  return (
    <div className="space-y-2">
      <label className="font-semibold text-gray-400">{label}</label>
      <input
        type="text"
        placeholder={placeholder}
        className="w-full rounded-lg border border-gray-200 p-3"
      />
    </div>
  );
}

export default function AddMenu() {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen flex-col bg-white">
      {/* 상단 헤더 */}
      <header className="sticky top-0 flex items-center p-4">
        <button onClick={() => navigate(-1)}>
          <LuArrowLeft size={24} />
        </button>
        <h1 className="text-subtitle-2 absolute left-1/2 -translate-x-1/2">
          메뉴 추가
        </h1>
      </header>

      {/* 메인 폼 */}
      <main className="flex-grow space-y-6 p-4">
        {/* 이미지 업로드 */}
        <div className="flex flex-col items-center gap-2">
          <button className="flex h-24 w-24 flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-200">
            <LuCamera size={32} className="text-gray-300" />
          </button>
          <span className="text-gray-300">0/1</span>
        </div>

        {/* 입력 필드 */}
        <FormInput label="메뉴" placeholder="메뉴 이름을 입력해주세요." />
        <FormInput label="설명" placeholder="메뉴 설명을 입력해주세요." />
        <FormInput label="가격" placeholder="메뉴 가격을 입력해주세요." />
      </main>

      {/* 하단 버튼 */}
      <footer className="grid grid-cols-2 gap-2 p-4">
        <button
          onClick={() => navigate(-1)}
          className="rounded-lg bg-gray-100 py-4 font-bold"
        >
          취소
        </button>
        <button className="bg-primary-300 rounded-lg py-4 font-bold text-white">
          메뉴 추가하기
        </button>
      </footer>
    </div>
  );
}
