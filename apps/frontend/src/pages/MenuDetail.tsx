import GoBackIcon from '@/assets/icons/ic_arrow_left.svg?react';
import EmptyImage from '@/assets/images/img_empty_image.svg?react';
import BaseResponsiveLayout from '@/components/common/layouts/BaseResponsiveLayout';
import Navigator from '@/components/common/layouts/Navigator';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CtaButton from '../components/common/buttons/CtaButton';

export default function MenuDetail() {
  const navigate = useNavigate();
  const { menuId } = useParams();
  const isEditMode = menuId !== '0';

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
      setImage('');
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
        center={<div className="text-st-2">메뉴 상세</div>}
        onLeftPress={() => navigate(-1)}
      />

      <main className="flex flex-grow flex-col gap-2 py-2">
        <div className="mb-2 flex flex-col items-center gap-2">
          <div className="relative flex min-w-sm flex-col items-center justify-center gap-2 rounded-3xl border-2 border-gray-200 py-2 transition-all duration-200 hover:bg-gray-100">
            {image !== '' ? (
              <>
                <img
                  src={image ?? ''}
                  alt="미리보기"
                  className="aspect-square h-full w-full object-cover"
                />
              </>
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
        <CtaButton text="담기" radius="_2xl" />
      </footer>
    </BaseResponsiveLayout>
  );
}
