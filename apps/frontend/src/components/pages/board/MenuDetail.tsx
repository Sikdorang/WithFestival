import GoBackIcon from '@/assets/icons/ic_arrow_left.svg?react';
import EmptyImage from '@/assets/images/img_empty_image.svg?react';
import CtaButton from '@/components/common/buttons/CtaButton';
import BaseResponsiveLayout from '@/components/common/layouts/BaseResponsiveLayout';
import Navigator from '@/components/common/layouts/Navigator';
import { useOrderStore } from '@/stores/orderStore';
import * as Dialog from '@radix-ui/react-dialog';
import { useEffect, useState } from 'react';

interface Props {
  menuId: number;
  onClose: () => void;
}

export default function MenuDetail({ menuId, onClose }: Props) {
  const { addItem } = useOrderStore();

  const [menu, setMenu] = useState({
    id: 0,
    name: '',
    description: '',
    price: 0,
    image: '',
  });

  useEffect(() => {
    if (menuId) {
      setMenu({
        id: menuId,
        name: `메뉴 ID: ${menuId} 이름 예시`,
        description: '메뉴 설명 예시',
        price: 25000,
        image: '',
      });
    }
  }, [menuId]);

  const handleAddItem = () => {
    addItem({
      id: menu.id,
      name: menu.name,
      price: menu.price,
    });
    onClose();
  };

  return (
    <BaseResponsiveLayout>
      <Navigator
        left={<GoBackIcon />}
        center={<div className="text-st-2">메뉴 상세</div>}
        onLeftPress={onClose}
      />

      <main className="flex flex-grow flex-col gap-2 py-2">
        <div className="mb-2 flex flex-col items-center gap-2">
          <div className="relative flex min-w-sm flex-col items-center justify-center gap-2 rounded-3xl border-2 border-gray-200 py-2 transition-all duration-200 hover:bg-gray-100">
            {menu.image !== '' ? (
              <>
                <img
                  src={menu.image ?? ''}
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

        <h1 className="text-st-2 px-10">{menu.name}</h1>

        <p className="text-b-1 mb-2 px-10 text-gray-400">{menu.description}</p>

        <p className="text-st-2 px-10 text-black">
          {Number(menu.price).toLocaleString()}원
        </p>
      </main>

      <footer className="fixed right-0 bottom-0 left-0 flex justify-end gap-2 p-4">
        <Dialog.Close asChild>
          <CtaButton text="담기" radius="_2xl" onClick={handleAddItem} />
        </Dialog.Close>
      </footer>
    </BaseResponsiveLayout>
  );
}
