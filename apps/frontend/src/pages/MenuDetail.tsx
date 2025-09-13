import GoBackIcon from '@/assets/icons/ic_arrow_left.svg?react';
import CancelIcon from '@/assets/icons/ic_circle_cancel.svg?react';
import CameraIcon from '@/assets/images/img_camera.svg?react';
import TextInput from '@/components/common/inputs/TextInput';
import BaseResponsiveLayout from '@/components/common/layouts/BaseResponsiveLayout';
import Navigator from '@/components/common/layouts/Navigator';
import { ROUTES } from '@/constants/routes';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CtaButton from '../components/common/buttons/CtaButton';
import DeleteConfirmModal from '../components/common/modals/DeleteConfirmModal';

export default function MenuDetail() {
  const navigate = useNavigate();
  const { menuId } = useParams();
  const isEditMode = menuId !== '0';
  const [isEditingMode, setIsEditingMode] = useState(false);

  const [menu, setMenu] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [price, setPrice] = useState<number | string>('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isEditMode) {
      // TODO: 서버에서 menuId로 메뉴 상세 정보 API 호출
      console.log(`Loading data for menu ID: ${menuId}`);
      // --- API 호출 후 받아온 데이터로 상태 설정 (예시) ---
      setMenu('메뉴 이름 예시');
      setDescription('메뉴 설명 예시');
      setPrice(25000);
      setImagePreview('https://via.placeholder.com/400'); // 기존 이미지 URL
    }
  }, [isEditMode, menuId]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);

      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  if (isEditMode) {
    return (
      <BaseResponsiveLayout>
        <Navigator
          left={<GoBackIcon />}
          onLeftPress={() => navigate(-1)}
          title="메뉴 상세"
        />

        <main className="flex-grow p-4">
          {!isEditingMode ? (
            <div className="h-80 w-full">
              <img
                src={imagePreview || ''}
                alt={menu}
                className="h-full w-full rounded-2xl object-cover"
              />
            </div>
          ) : (
            <div className="relative h-80 w-full">
              {imagePreview ? (
                <>
                  <img
                    src={imagePreview}
                    alt="미리보기"
                    className="h-full w-full rounded-2xl object-cover"
                  />
                  <CtaButton
                    onClick={handleButtonClick}
                    className="absolute right-4 bottom-4 shadow-md"
                    color="white"
                    width="fit"
                    size="small"
                    radius="xl"
                    text="이미지 변경"
                  />
                  <button
                    onClick={handleImageCancel}
                    className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full"
                  >
                    <CancelIcon />
                  </button>
                </>
              ) : (
                <div className="flex w-full justify-center">
                  <button
                    onClick={handleButtonClick}
                    className="flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-gray-200 px-6 py-2 transition-all duration-200 hover:bg-gray-100"
                  >
                    <CameraIcon className="text-gray-300" />
                    <span className="text-gray-400">0/1</span>
                  </button>
                </div>
              )}
            </div>
          )}

          <div className="space-y-2">
            {isEditingMode ? (
              <TextInput
                label="메뉴"
                placeholder="메뉴 이름을 입력해주세요."
                limitHide
                value={menu}
                onChange={(e) => setMenu(e.target.value)}
              />
            ) : (
              <h1 className="text-title">{menu}</h1>
            )}
            {isEditingMode ? (
              <TextInput
                label="설명"
                placeholder="메뉴 설명을 입력해주세요."
                limitHide
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            ) : (
              <p className="text-body-2 text-gray-500">{description}</p>
            )}
            {isEditingMode ? (
              <TextInput
                label="가격"
                placeholder="메뉴 가격을 입력해주세요."
                limitHide
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
              />
            ) : (
              <p className="text-title pt-2">
                {Number(price).toLocaleString()}원
              </p>
            )}
          </div>
        </main>

        {/* 하단 버튼 */}
        <footer className="grid grid-cols-2 gap-2 p-4">
          <DeleteConfirmModal
            title={'메뉴 삭제를 할까요 ?'}
            description={'메뉴 삭제 후에는 복구할 수 없어요.'}
            cancelButtonText={'취소'}
            confirmButtonText={'삭제하기'}
          >
            <CtaButton text="삭제하기" radius="xl" color="red" />
          </DeleteConfirmModal>

          <CtaButton
            text={isEditingMode ? '수정완료' : '수정하기'}
            radius="xl"
            onClick={() => {
              if (isEditingMode) {
                setIsEditingMode(false);
              } else {
                setIsEditingMode(true);
              }
            }}
          />
        </footer>
      </BaseResponsiveLayout>
    );
  }

  return (
    <BaseResponsiveLayout>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />

      <Navigator
        left={<GoBackIcon />}
        center={<div className="text-st-2">메뉴 추가</div>}
        onLeftPress={() => navigate(-1)}
      />

      <main className="flex-grow space-y-6 p-4">
        <div className="flex flex-col items-center gap-2">
          <div className="relative flex max-w-sm flex-col items-center justify-center gap-2 rounded-3xl border-2 border-gray-200 px-6 py-2 transition-all duration-200 hover:bg-gray-100">
            {imagePreview ? (
              <>
                <img
                  src={imagePreview}
                  alt="미리보기"
                  className="h-full w-full rounded-2xl object-cover"
                />
                <CtaButton
                  onClick={handleButtonClick}
                  className="absolute right-4 bottom-4 shadow-md"
                  color="white"
                  width="fit"
                  size="small"
                  radius="xl"
                  text="이미지 변경"
                />
                <button
                  onClick={handleImageCancel}
                  className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full"
                >
                  <CancelIcon />
                </button>
              </>
            ) : (
              <button
                onClick={handleButtonClick}
                className="flex h-full w-full flex-col items-center justify-center gap-2 hover:bg-gray-100"
              >
                <CameraIcon className="text-gray-300" />
                <span className="text-gray-400">0/1</span>
              </button>
            )}
          </div>
        </div>

        <TextInput
          label="메뉴"
          placeholder="메뉴 이름을 입력해주세요."
          limitHide
          value={menu}
          onChange={(e) => setMenu(e.target.value)}
        />
        <TextInput
          label="설명"
          placeholder="메뉴 설명을 입력해주세요."
          limitHide
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <TextInput
          label="가격"
          placeholder="메뉴 가격을 입력해주세요."
          limitHide
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
        />
      </main>

      <footer className="flex gap-2 p-4">
        <div>
          <CtaButton
            text="취소"
            radius="xl"
            onClick={() => navigate(-1)}
            color="white"
            width="fit"
          />
        </div>

        <div className="flex-1">
          <CtaButton
            text="메뉴 추가하기"
            radius="xl"
            onClick={() => {
              navigate(ROUTES.MANAGE_WAITING);
            }}
          />
        </div>
      </footer>
    </BaseResponsiveLayout>
  );
}
