import DeleteConfirmModal from '@/components/common/modals/DeleteConfirmModal';
import * as Dialog from '@radix-ui/react-dialog';
import { useState } from 'react';
import toast from 'react-hot-toast';
import OrderDetail from './OrderDetail';
interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export interface Order {
  orderNumber: number;
  tableNumber: number;
  time: string;
  totalAmount: number;
  totalQuantity: number;
  depositorName: string;
  items: OrderItem[];
}

interface Props {
  order: Order;
  isConfirm: boolean;
}

export function OrderCard({ order, isConfirm = false }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const notification = new Audio('/sounds/effect_notification.mp3');

  const handleOrderCardClick = () => {
    setIsModalOpen(true);
  };

  return (
    <Dialog.Root open={isModalOpen} onOpenChange={setIsModalOpen}>
      <div className="space-y-3 rounded-lg bg-white p-4">
        <div className="flex flex-col">
          <div className="mb-2 flex items-center gap-1">
            <span className="text-b-2 text-black">주문번호</span>
            <span className="text-b-2 text-black">
              {String(order.orderNumber).padStart(3, '0')}
            </span>
          </div>
          <div className="flex justify-between">
            <div className="flex flex-col">
              <span className="text-b-2 text-gray-400">테이블 번호</span>
              <span className="text-b-2 inline-flex self-start rounded-lg bg-black px-3 py-1 text-white">
                {order.tableNumber}번
              </span>
            </div>

            <div className="flex flex-col items-center">
              <span className="text-gray-400">{order.time}</span>
            </div>
          </div>
        </div>

        <div className="space-y-2 border-b border-gray-200 py-3">
          <p className="text-c-1 text-gray-400">주문내역</p>
          {order.items.map((item) => (
            <div
              key={`${order.orderNumber}-${item.id}`}
              className="flex justify-between"
            >
              <p className="text-gray-black">{item.name} </p>
              <div className="text-right">
                <p className="text-gray-black">
                  {(item.price * item.quantity).toLocaleString()}원
                </p>
                <span className="text-sm text-gray-300">{item.quantity}개</span>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-between font-bold text-black">
          <p>총 금액</p>
          <div className="text-right">
            <p>{order.totalAmount.toLocaleString()}원</p>
            <span className="text-sm font-medium text-gray-400">
              총 {order.totalQuantity}개
            </span>
          </div>
        </div>

        {isConfirm ? (
          <div className="flex flex-col gap-2">
            <button
              className="rounded-2xl bg-gray-100 py-3 text-black"
              onClick={() => handleOrderCardClick()}
            >
              전체 보기
            </button>
            <button className="bg-primary-300 rounded-2xl py-3 text-black">
              조리 완료
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <div className="grid grid-cols-2 gap-2 pt-2">
              <DeleteConfirmModal
                title={'주문을 취소할까요 ?'}
                description={'주문 취소 후에는 복구할 수 없어요.'}
                cancelButtonText={'돌아가기'}
                confirmButtonText={'주문 취소하기'}
              >
                <button className="w-full rounded-2xl bg-red-500 py-3 font-bold text-white">
                  취소
                </button>
              </DeleteConfirmModal>
              <button
                className="bg-primary-300 rounded-2xl py-3 font-bold text-black"
                onClick={() => {
                  toast.success('송금이 확인되었습니다. 조리를 시작하세요 !');
                  notification.play();
                }}
              >
                송금 확인
              </button>
            </div>

            <div className="flex items-center gap-4 rounded-xl bg-gray-100 p-3 px-8">
              <span className="text-sm text-gray-400">입금자명</span>
              <p className="text-gray-black">{order.depositorName}</p>
            </div>
          </div>
        )}

        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/30" />
          <Dialog.Content className="fixed inset-0 z-50 overflow-y-auto bg-white">
            <OrderDetail
              order={order}
              onClose={() => {
                setIsModalOpen(false);
              }}
            />
          </Dialog.Content>
        </Dialog.Portal>
      </div>
    </Dialog.Root>
  );
}
