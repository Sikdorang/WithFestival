import GoBackIcon from '@/assets/icons/ic_arrow_left.svg?react';
import BombIcon from '@/assets/icons/ic_bomb.svg?react';
import CancelIcon from '@/assets/icons/ic_cancel.svg?react';
import CopyIcon from '@/assets/icons/ic_copy.svg?react';
import EmptyImage from '@/assets/images/img_empty_image.svg?react';
import { SUCCESS_MESSAGES } from '@/constants/message';
import { useOrder } from '@/hooks/useOrder';
import { useOrderStore } from '@/stores/orderStore';
import * as Dialog from '@radix-ui/react-dialog';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Navigate, useNavigate } from 'react-router-dom';
import CtaButton from '../components/common/buttons/CtaButton';
import BottomSpace from '../components/common/exceptions/BottomSpace';
import TextInput from '../components/common/inputs/TextInput';
import Navigator from '../components/common/layouts/Navigator';
import DeleteConfirmModal from '../components/common/modals/DeleteConfirmModal';
import { ROUTES } from '../constants/routes';
import { useStore } from '../hooks/useStore';
import Lottie from 'lottie-react';
import CheckAnimation from '@/assets/lotties/lottie_check.json';

const IMAGE_PREFIX = import.meta.env.VITE_IMAGE_PREFIX;

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
  const userData = JSON.parse(sessionStorage.getItem('userData') || '{}');

  const { getUserInfoByUserId, account } = useStore();

  useEffect(() => {
    getUserInfoByUserId(userData.userId);
  }, []);

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
            <span className="text-b-1 text-gray-700">{account}</span>
            <CopyIcon
              onClick={() => {
                navigator.clipboard.writeText(account);
                toast.success(SUCCESS_MESSAGES.accountCopySuccess);
              }}
            />
          </div>
        </div>
      </div>
      <footer className="fixed right-0 bottom-0 left-0 z-10 flex items-center gap-4 bg-white p-4">
        <DeleteConfirmModal
          title={'송금을 완료하셨나요 ?'}
          description={'송금하지 않고 넘어가면 주문이 취소될 수 있어요 !'}
          cancelButtonText={'돌아가기'}
          confirmButtonText={'완료했어요 !'}
          onConfirm={onNext}
        >
          <CtaButton text="송금 완료" radius="_2xl" />
        </DeleteConfirmModal>
      </footer>
    </div>
  );
}

function DepositorStep({
  onSubmit,
  depositorName,
  setDepositorName,
}: {
  onSubmit: () => void;
  depositorName: string;
  setDepositorName: (name: string) => void;
}) {
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
          value={depositorName}
          onChange={(e) => setDepositorName(e.target.value)}
          limitHide
        />
      </div>

      <footer className="fixed right-0 bottom-0 left-0 z-10 flex items-center gap-4 bg-white p-4">
        <CtaButton
          text="입력 완료"
          onClick={() => {
            setDepositorName(depositorName);
            setDepositorName('');
            onSubmit();
          }}
          disabled={depositorName.trim() === ''}
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
  quantity,
}: {
  name: string;
  price: number;
  image: string;
  quantity: number;
}) {
  return (
    <div className="flex justify-between py-4">
      {image ? (
        <img
          className="flex aspect-square max-w-[180px] flex-1 rounded-2xl bg-gray-100"
          src={`${IMAGE_PREFIX}${image}`}
        />
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
        <div className="text-st-1 text-gray-800">{quantity}개</div>
      </div>
    </div>
  );
}

function MenuList({ items }: { items: OrderItem[] }) {
  const { decreaseItemQuantity } = useOrderStore();
  return (
    <div className="rounded-lg bg-white">
      {items.map((item) => (
        <div key={item.id} className="relative pr-10">
          <MenuItem
            key={item.id}
            name={item.name}
            price={item.price}
            image={item.image}
            quantity={item.quantity}
          />
          <button
            onClick={() => decreaseItemQuantity(item.id)}
            className="absolute top-5 right-2"
          >
            <CancelIcon />
          </button>
        </div>
      ))}
    </div>
  );
}

function CompleteStep() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-1 flex-col items-center justify-center pb-15 text-center">
      <div className="flex w-full flex-col items-center gap-4 px-8">
        <Lottie
          animationData={CheckAnimation}
          loop={false}
          style={{ width: 64, height: 64 }}
        />
        <div className="text-t-1 mb-2">주문이 완료되었습니다.</div>
        <CtaButton text="확인" onClick={() => navigate(ROUTES.MENU_BOARD)} />
      </div>
    </div>
  );
}

export default function Ordering() {
  const userData = JSON.parse(sessionStorage.getItem('userData') || '{}');
  const navigate = useNavigate();
  const { orderItems, clearOrder } = useOrderStore();
  const { createOrder } = useOrder();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalStep, setModalStep] = useState<
    'remit' | 'depositor' | 'complete'
  >('remit');
  const [depositorName, setDepositorName] = useState('');

  const totalAmount = orderItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const handleFinalSubmit = async () => {
    const success = await createOrder(depositorName);

    if (success) {
      clearOrder();
      setIsModalOpen(false);
      setModalStep('complete');
      navigate(ROUTES.MENU_BOARD);
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
              else if (modalStep === 'complete') setModalStep('remit');
              else setIsModalOpen(false);
            }}
            center={
              <div className="text-st-1">
                {modalStep === 'remit'
                  ? '송금하기'
                  : modalStep === 'depositor'
                    ? '입금자명 입력'
                    : '주문 완료'}
              </div>
            }
          />
          {modalStep === 'remit' ? (
            <RemitStep
              totalAmount={totalAmount}
              onNext={() => setModalStep('depositor')}
            />
          ) : modalStep === 'depositor' ? (
            <DepositorStep
              onSubmit={handleFinalSubmit}
              depositorName={depositorName}
              setDepositorName={setDepositorName}
            />
          ) : (
            <CompleteStep />
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
