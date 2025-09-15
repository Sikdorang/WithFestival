import BombIcon from '@/assets/icons/ic_bomb.svg?react';
import WarningIcon from '@/assets/icons/ic_warning.svg?react';
import MenuDetail from '@/components/pages/board/MenuDetail';
import { ROUTES } from '@/constants/routes';
import { useOrderStore } from '@/stores/orderStore';
import * as Dialog from '@radix-ui/react-dialog';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import TopBar from '../components/common/layouts/TopBar';
import { KEYS } from '../constants/storage';

const mockMenuList = [
  { id: 1, name: '아롱사태 수육', price: 25000 },
  { id: 2, name: '돼지국밥', price: 18000 },
  { id: 3, name: '파전', price: 22000 },
  { id: 1, name: '아롱사태 수육', price: 25000 },
  { id: 2, name: '돼지국밥', price: 18000 },
  { id: 3, name: '파전', price: 22000 },
  { id: 1, name: '아롱사태 수육', price: 25000 },
  { id: 2, name: '돼지국밥', price: 18000 },
  { id: 3, name: '파전', price: 22000 },
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
          <div className="text-c-1 flex text-red-500">
            <WarningIcon />
            주문은 테이블 착석후에 가능해요.
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
  onClick,
}: {
  name: string;
  price: number;
  onClick: () => void;
}) {
  return (
    <div className="flex items-center justify-between py-4" onClick={onClick}>
      <div>
        <h3 className="text-body-1 text-gray-black font-semibold">{name}</h3>
        <p className="text-body-1 text-gray-black font-bold">
          {price.toLocaleString()}원
        </p>
      </div>
      <div className="h-30 w-30 rounded-md bg-gray-100" />
    </div>
  );
}

function MenuList({
  onMenuItemClick,
}: {
  onMenuItemClick: (id: number) => void;
}) {
  return (
    <div className="rounded-lg bg-white">
      {mockMenuList.map((item) => (
        <MenuItem
          key={item.id}
          name={item.name}
          price={item.price}
          onClick={() => onMenuItemClick(item.id)}
        />
      ))}
    </div>
  );
}

export default function MenuBoard() {
  const navigate = useNavigate();

  const { storeId } = useParams();
  const { orderItems } = useOrderStore();
  const isPreview = localStorage.getItem(KEYS.IS_PREVIEW);

  // 1. 모달의 열림/닫힘 상태와 선택된 메뉴 ID를 관리합니다.
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMenuId, setSelectedMenuId] = useState<number | null>(null);

  // 2. 메뉴 아이템 클릭 시 실행될 핸들러
  const handleMenuItemClick = (id: number) => {
    setSelectedMenuId(id);
    setIsModalOpen(true);
  };

  const totalAmount = orderItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <Dialog.Root open={isModalOpen} onOpenChange={setIsModalOpen}>
      <div className="relative min-h-screen space-y-4 bg-white p-4">
        <TopBar />
        <main className="pt-12 pb-24">
          <StoreInfoSection isPreview={isPreview === '1'} tableNumber={3} />
          <MenuList onMenuItemClick={handleMenuItemClick} />
        </main>
      </div>

      {/* 4. 모달 콘텐츠 영역 */}
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
            onClick={() => navigate(ROUTES.ORDERING.DETAIL(storeId))}
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
