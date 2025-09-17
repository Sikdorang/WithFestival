import GoBackIcon from '@/assets/icons/ic_arrow_left.svg?react';
import CancelIcon from '@/assets/icons/ic_circle_cancel.svg?react';
import CameraIcon from '@/assets/images/img_camera.svg?react';
import EmptyImage from '@/assets/images/img_empty_image.svg?react';
import TextInput from '@/components/common/inputs/TextInput';
import BaseResponsiveLayout from '@/components/common/layouts/BaseResponsiveLayout';
import Navigator from '@/components/common/layouts/Navigator';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CtaButton from '../components/common/buttons/CtaButton';
import DeleteConfirmModal from '../components/common/modals/DeleteConfirmModal';
import { ROUTES } from '../constants/routes';
import { useMenu } from '../hooks/useMenu';

export default function ManageMenuDetail() {
  const navigate = useNavigate();
  const { createMenu, deleteMenu } = useMenu();

  const menuId = Number(useParams().menuId);
  const isEditMode = menuId !== 0;
  const [isEditingMode, setIsEditingMode] = useState(false);

  const [menu, setMenu] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [price, setPrice] = useState<number | string>('');
  const [image, setImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isEditMode) {
      setMenu('메뉴 이름 예시');
      setDescription('메뉴 설명 예시');
      setPrice(25000);
      setImage('https://via.placeholder.com/400');
    }
  }, [isEditMode, menuId]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
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
    setImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleCreateMenu = () => {
    createMenu({
      menu,
      description,
      price: Number(price),
    });
    navigate(ROUTES.STORE);
  };

  if (isEditMode) {
    return (
      <BaseResponsiveLayout>
        <Navigator
          left={<GoBackIcon />}
          onLeftPress={() => navigate(-1)}
          title="메뉴 상세"
        />

        <main className="flex flex-grow flex-col">
          <div className="mb-2 flex w-full flex-col items-center gap-2 px-8">
            <div className="relative flex w-full flex-col items-center justify-center gap-2 rounded-3xl border-2 border-gray-200 transition-all duration-200 hover:bg-gray-100">
              {image !== '' ? (
                <img
                  src={image ?? ''}
                  alt="미리보기"
                  className="aspect-square h-full w-full object-cover"
                />
              ) : (
                <div className="flex aspect-square w-full flex-col items-center justify-center gap-2 text-gray-400">
                  <EmptyImage className="h-30 w-30" />
                </div>
              )}
            </div>
          </div>

          <h1 className="text-st-2 px-10">{menu}</h1>

          <p className="text-b-1 mb-2 px-10 text-gray-400">{description}</p>

          <p className="text-st-2 px-10 text-black">
            {Number(price).toLocaleString()}원
          </p>
        </main>

        <footer className="fixed right-0 bottom-0 left-0 flex justify-end gap-2 p-4">
          <DeleteConfirmModal
            title={'메뉴 삭제를 할까요 ?'}
            description={'메뉴 삭제 후에는 복구할 수 없어요.'}
            cancelButtonText={'취소'}
            confirmButtonText={'삭제하기'}
            onConfirm={() => {
              deleteMenu(menuId);
            }}
          >
            <CtaButton text="삭제하기" radius="xl" color="red" width="fit" />
          </DeleteConfirmModal>

          <div className="flex-1">
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
          </div>
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
            {image ? (
              <>
                <img
                  src={image}
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

      <footer className="fixed right-0 bottom-0 left-0 flex justify-end gap-2 p-4">
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
              handleCreateMenu();
            }}
          />
        </div>
      </footer>
    </BaseResponsiveLayout>
  );
}
