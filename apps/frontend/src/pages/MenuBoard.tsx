import BombIcon from '@/assets/icons/ic_bomb.svg?react';
import EmptyImage from '@/assets/images/img_empty_image.svg?react';
import MenuDetail from '@/components/pages/board/MenuDetail';
import { ROUTES } from '@/constants/routes';
import { useOrderStore } from '@/stores/orderStore';
import * as Dialog from '@radix-ui/react-dialog';
import { useEffect, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import BottomSpace from '../components/common/exceptions/BottomSpace';
import TopBar from '../components/common/layouts/TopBar';
import { KEYS } from '../constants/storage';
import { useMenu } from '../hooks/useMenu';

const mockMenuList = [
  { id: 1, name: '아롱사태 수육', price: 25000, image: '' },
  { id: 2, name: '돼지국밥', price: 18000, image: '' },
  { id: 3, name: '파전', price: 22000, image: '' },
  { id: 1, name: '아롱사태 수육', price: 25000, image: '' },
  { id: 2, name: '돼지국밥', price: 18000, image: '' },
  { id: 3, name: '파전', price: 22000, image: '' },
  { id: 1, name: '아롱사태 수육', price: 25000 },
  { id: 2, name: '돼지국밥', price: 18000, image: '' },
  { id: 3, name: '파전', price: 22000, image: '' },
];

interface StoreInfoSectionProps {
  isPreview: boolean;
  tableNumber?: number;
}

function StoreInfoSection({ isPreview, tableNumber }: StoreInfoSectionProps) {
  return (
    <div>
      <div className="flex flex-col gap-2">
        <div className="text-b-2 text-gray-300">이상현 부스</div>
        <div className="text-st-2 text-black">
          {isPreview ? '메뉴판 미리보기' : `테이블 번호 ${tableNumber}`}
        </div>
        {isPreview ? (
          <div className="text-c-1 flex text-gray-200">
            웨이팅을 기다리며 메뉴를 미리 볼 수 있어요.
          </div>
        ) : (
          <RussianRoulette />
        )}
      </div>
    </div>
  );
}

function RussianRoulette() {
  const navigate = useNavigate();

  return (
    <div
      className="bg-primary-100 mt-4 flex items-center justify-center gap-2 rounded-xl py-4"
      onClick={() => {
        navigate(ROUTES.GAMES.DETAIL('1'));
      }}
    >
      <BombIcon />
      <div className="text-b-1">결제할 사람 룰렛 돌리기</div>
    </div>
  );
}

function MenuItem({
  name,
  price,
  image,
  onClick,
}: {
  name: string;
  price: number;
  image: string;
  onClick: () => void;
}) {
  return (
    <div className="w-fullitems-center flex py-4" onClick={onClick}>
      <div className="flex-1 text-left">
        <h3 className="text-b-1 text-gray-400">{name}</h3>
        <p className="text-st-1 text-gray-800">{price.toLocaleString()}원</p>
      </div>
      {image ? (
        <img className="h-20 w-20 rounded-md bg-gray-100" src={image} />
      ) : (
        <div className="flex aspect-square flex-1 items-center justify-center rounded-3xl bg-gray-100">
          <EmptyImage />
        </div>
      )}
    </div>
  );
}

function MenuList({
  onMenuItemClick,
}: {
  onMenuItemClick: (id: number) => void;
}) {
  const { menus, isLoading, fetchMenu } = useMenu();

  useEffect(() => {
    fetchMenu();
  }, [fetchMenu]);

  return (
    <div className="rounded-lg bg-white">
      {menus.map((item) => (
        <MenuItem
          key={item.id}
          name={item.menu}
          price={item.price}
          image={item.image ?? ''}
          onClick={() => onMenuItemClick(item.id)}
        />
      ))}
    </div>
  );
}

export default function MenuBoard() {
  const navigate = useNavigate();
  const location = useLocation();

  const { orderItems } = useOrderStore();
  const isPreview = localStorage.getItem(KEYS.IS_PREVIEW);

  const userData =
    location.state?.userData ||
    JSON.parse(sessionStorage.getItem('userData') || '{}');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMenuId, setSelectedMenuId] = useState<number | null>(null);

  const handleMenuItemClick = (id: number) => {
    setSelectedMenuId(id);
    setIsModalOpen(true);
  };

  // const totalAmount = orderItems.reduce(
  //   (sum, item) => sum + item.price * item.quantity,
  //   0,
  // );

  if (userData.userId === undefined) {
    return <Navigate to={ROUTES.NOT_FOUND} replace />;
  }

  return (
    <Dialog.Root open={isModalOpen} onOpenChange={setIsModalOpen}>
      <div className="relative min-h-screen space-y-4 bg-white p-4">
        <TopBar />
        <main className="pt-12 pb-24">
          <StoreInfoSection
            isPreview={isPreview === '1'}
            tableNumber={userData.tableId}
          />
          <MenuList onMenuItemClick={handleMenuItemClick} />
          <BottomSpace />
        </main>
      </div>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/30" />
        <Dialog.Content className="fixed inset-0 z-50 overflow-y-auto bg-white">
          {selectedMenuId && (
            <MenuDetail
              menuId={selectedMenuId}
              onClose={() => setIsModalOpen(false)}
            />
          )}
        </Dialog.Content>
      </Dialog.Portal>

      {orderItems.length > 0 && (
        <footer className="fixed right-0 bottom-0 left-0 z-10 flex items-center gap-4 p-4">
          <button
            onClick={() => navigate(ROUTES.ORDERING)}
            className="bg-primary-300 flex w-full flex-1 items-center justify-between rounded-2xl px-6 py-4 text-black"
          >
            <div className="flex w-full items-center justify-center gap-2">
              <div className="text-b-1">주문하기</div>
              <div className="text-c-1 flex h-6 w-6 items-center justify-center rounded-full bg-black text-white">
                {orderItems.length}
              </div>
            </div>
          </button>
        </footer>
      )}
    </Dialog.Root>
  );
}
