// OrderDetail.tsx
import GoBackIcon from '@/assets/icons/ic_arrow_left.svg?react';
import CtaButton from '@/components/common/buttons/CtaButton';
import Navigator from '@/components/common/layouts/Navigator';
import { Order } from '@/components/pages/order/OrderCard';
import toast from 'react-hot-toast';

interface OrderDetailProps {
  order: Order | null;
  onClose: () => void;
}

export default function OrderDetail({ order, onClose }: OrderDetailProps) {
  if (!order) {
    return null;
  }

  return (
    <div className="flex h-full flex-col">
      <Navigator
        left={<GoBackIcon />}
        center={<div className="text-st-1">주문 상세</div>}
        onLeftPress={onClose}
      />

      <main className="flex-grow p-4 pt-20">
        {/* 주문 번호 및 시간 */}
        <div className="flex items-center justify-between">
          <div className="text-b-1 rounded-md bg-black px-2 py-1 font-bold text-white">
            {order.orderNumber}번
          </div>
          <span className="text-b-2 text-gray-400">{order.time}</span>
        </div>

        {/* 주문 내역 */}
        <div className="mt-4">
          <h3 className="text-b-2 text-gray-500">주문내역</h3>
          <div className="mt-2 flex flex-col">
            {order.items.map((item) => (
              <div
                key={item.id}
                className="flex justify-between border-b border-gray-100 py-3"
              >
                <div>
                  <p className="text-b-1">{item.name}</p>
                </div>
                <p className="text-b-1 text-right font-semibold">
                  {item.price.toLocaleString()}원
                  <p className="text-c-1 text-gray-400">{item.quantity}개</p>
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 총 금액 */}
        <div className="mt-6 flex items-end justify-between">
          <span className="text-b-1">총 금액</span>
          <div>
            <p className="text-st-1 text-right text-black">
              {order.totalAmount.toLocaleString()}원
            </p>
            <p className="text-c-1 text-right text-gray-400">
              총 {order.totalQuantity}개
            </p>
          </div>
        </div>
      </main>

      <footer className="w-full p-4">
        <CtaButton
          text="조리 완료"
          onClick={() => {
            onClose();
            toast.success('조리가 완료되었습니다.');
          }}
          radius="_2xl"
        />
      </footer>
    </div>
  );
}
