import GoBackIcon from '@/assets/icons/ic_arrow_left.svg?react';
import BombIcon from '@/assets/icons/ic_bomb.svg?react';
import CancelIcon from '@/assets/icons/ic_cancel.svg?react';
import CopyIcon from '@/assets/icons/ic_copy.svg?react';
import EmptyImage from '@/assets/images/img_empty_image.svg?react';
import { SUCCESS_MESSAGES } from '@/constants/message';
import { useOrder } from '@/hooks/useOrder';
import { useOrderStore } from '@/stores/orderStore';
import * as Dialog from '@radix-ui/react-dialog';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Navigate, useNavigate } from 'react-router-dom';
import CtaButton from '../components/common/buttons/CtaButton';
import BottomSpace from '../components/common/exceptions/BottomSpace';
import TextInput from '../components/common/inputs/TextInput';
import Navigator from '../components/common/layouts/Navigator';
import { ROUTES } from '../constants/routes';

interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
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

function RemitStep({
  totalAmount,
  onNext,
}: {
  totalAmount: number;
  onNext: () => void;
}) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center pb-15 text-center">
      <div className="flex flex-col gap-8">
        <div className="text-t-1">
          {totalAmount.toLocaleString()}원을
          <br />
          입금해주세요!
        </div>
        <div className="flex w-full flex-col items-center gap-2 rounded-xl bg-gray-100 px-15 py-5">
          <span className="text-b-2 rounded-xl bg-green-100 px-3 py-1 text-green-500">
            계좌번호
          </span>
          <div className="flex items-center gap-2">
            <span className="text-b-1 text-gray-700">
              카카오뱅크 3333-27-1896702
            </span>
            <CopyIcon
              onClick={() => {
                navigator.clipboard.writeText('3333271896702');
                toast.success(SUCCESS_MESSAGES.accountCopySuccess);
              }}
            />
          </div>
        </div>
      </div>
      <footer className="fixed right-0 bottom-0 left-0 z-10 flex items-center gap-4 bg-white p-4">
        <CtaButton text="송금 완료" onClick={onNext} radius="_2xl" />
      </footer>
    </div>
  );
}

function DepositorStep({ onSubmit }: { onSubmit: () => void }) {
  const { setDepositorName } = useOrderStore();
  const [depositorNameInput, setDepositorNameInput] = useState('');
  return (
    <div className="flex flex-1 flex-col items-center justify-center pb-15 text-center">
      <div className="flex w-full flex-col items-center gap-4 px-8">
        <div className="text-t-1 mb-2">
          입금하신 분의
          <br />
          이름을 입력해주세요!
        </div>
        <TextInput
          placeholder="입금자명을 입력해주세요."
          value={depositorNameInput}
          onChange={(e) => setDepositorNameInput(e.target.value)}
          limitHide
        />
      </div>

      <footer className="fixed right-0 bottom-0 left-0 z-10 flex items-center gap-4 bg-white p-4">
        <CtaButton
          text="입력 완료"
          onClick={() => {
            setDepositorName(depositorNameInput);
            setDepositorNameInput('');
            onSubmit();
          }}
          disabled={depositorNameInput.trim() === ''}
          radius="_2xl"
        />
      </footer>
    </div>
  );
}

function MenuItem({
  name,
  price,
  image,
}: {
  name: string;
  price: number;
  image: string;
}) {
  return (
    <div className="flex justify-between py-4">
      {image ? (
        <img className="h-20 w-20 rounded-md bg-gray-100" src={image} />
      ) : (
        <div className="flex aspect-square flex-1 items-center justify-center rounded-3xl bg-gray-100">
          <EmptyImage />
        </div>
      )}

      <div className="flex-1 pl-4 text-left">
        <div className="text-b-1 text-gray-400">{name}</div>
        <div className="text-st-1 text-gray-800">
          {price.toLocaleString()}원
        </div>
      </div>
    </div>
  );
}

function MenuList({ items }: { items: OrderItem[] }) {
  const { removeItem } = useOrderStore();
  return (
    <div className="rounded-lg bg-white">
      {items.map((item) => (
        <div key={item.id} className="relative pr-10">
          <MenuItem name={item.name} price={item.price} image={item.image} />
          <button
            onClick={() => removeItem(item.id)}
            className="absolute top-5 right-2"
          >
            <CancelIcon />
          </button>
        </div>
      ))}
    </div>
  );
}

export default function Ordering() {
  const userData = JSON.parse(sessionStorage.getItem('userData') || '{}');
  const navigate = useNavigate();
  const { orderItems, clearOrder } = useOrderStore();
  const { createOrder } = useOrder();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalStep, setModalStep] = useState<'remit' | 'depositor'>('remit');

  const totalAmount = orderItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const handleFinalSubmit = async () => {
    // 훅에 있는 createOrder 함수를 호출하고 결과를 기다립니다.
    const success = await createOrder();

    // API 호출이 성공했을 때만 후속 처리를 합니다.
    if (success) {
      clearOrder(); // Zustand 스토어의 장바구니 비우기
      setIsModalOpen(false); // 모달 닫기
      setModalStep('remit'); // 모달 스텝 초기화
      navigate(ROUTES.MENU_BOARD); // 주문 완료 후 메뉴판으로 이동
    }
  };

  if (userData.userId === undefined) {
    return <Navigate to={ROUTES.NOT_FOUND} replace />;
  }

  return (
    <Dialog.Root open={isModalOpen} onOpenChange={setIsModalOpen}>
      <div className="relative min-h-screen bg-white px-4">
        <Navigator
          left={<GoBackIcon />}
          onLeftPress={() => navigate(ROUTES.MENU_BOARD)}
          center={<div className="text-st-1">주문하기</div>}
        />
        <main className="pb-24">
          <RussianRoulette />
          <h2 className="text-st-2 mt-6 mb-2">주문 내역</h2>
          <MenuList items={orderItems} />
          <BottomSpace />
        </main>
      </div>

      {orderItems.length > 0 && (
        <footer className="fixed right-0 bottom-0 left-0 z-10 flex items-center gap-4 bg-white p-4">
          <span className="text-st-2 text-black">
            총 {totalAmount.toLocaleString()}원
          </span>
          <Dialog.Trigger asChild>
            <button className="bg-primary-300 text-b-1 flex-1 rounded-2xl py-4 text-center text-black">
              송금하기
            </button>
          </Dialog.Trigger>
        </footer>
      )}

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content className="fixed inset-0 z-50 flex flex-col bg-white">
          <Dialog.Title className="sr-only">
            송금하기 또는 입금자명 입력
          </Dialog.Title>
          <Dialog.Description className="sr-only">
            송금하기 또는 입금자명 입력
          </Dialog.Description>
          <Navigator
            left={<GoBackIcon />}
            onLeftPress={() => {
              if (modalStep === 'depositor') setModalStep('remit');
              else setIsModalOpen(false);
            }}
            center={modalStep === 'remit' ? '송금하기' : '입금자명 입력'}
          />
          {modalStep === 'remit' ? (
            <RemitStep
              totalAmount={totalAmount}
              onNext={() => setModalStep('depositor')}
            />
          ) : (
            <DepositorStep onSubmit={handleFinalSubmit} />
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
