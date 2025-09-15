import BombIcon from '@/assets/icons/ic_bomb.svg?react';
import WarningIcon from '@/assets/icons/ic_warning.svg?react';
import { ROUTES } from '@/constants/routes';
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

function MenuList() {
  const navigate = useNavigate();
  return (
    <div className="rounded-lg bg-white">
      {mockMenuList.map((item) => (
        <MenuItem
          key={item.id}
          name={item.name}
          price={item.price}
          onClick={() => {
            navigate(ROUTES.MENUS.DETAIL(item.id.toString()));
          }}
        />
      ))}
    </div>
  );
}

export default function MenuBoard() {
  const { menuId } = useParams();
  const isPreview = localStorage.getItem(KEYS.IS_PREVIEW);

  return (
    <div className="relative min-h-screen space-y-4 bg-white p-4">
      <TopBar />
      <main className="pt-12 pb-24">
        <StoreInfoSection isPreview={isPreview === '1'} tableNumber={3} />
        <MenuList />
      </main>
    </div>
  );
}
