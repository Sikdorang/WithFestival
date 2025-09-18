import EmptyImage from '@/assets/icons/ic_circle_plus.svg?react';
import BottomSpace from '@/components/common/exceptions/BottomSpace';
import { OrderBill } from '@/components/pages/order/OrderBill';
import { useOrder } from '@/hooks/useOrder';
import { useEffect } from 'react';

export default function History() {
  const { getAllOrders, allOrders } = useOrder();

  useEffect(() => {
    getAllOrders();
  }, [getAllOrders]);

  return (
    <div className="flex min-h-screen flex-1 flex-col gap-4 bg-gray-400">
      <header className="bg-white p-4">
        <h1 className="text-st-2">
          전체 주문 내역{' '}
          <span className="text-primary-300">{allOrders?.count || 0}</span>
        </h1>
      </header>

      <div className="relative flex flex-1 flex-col gap-4 p-4">
        {allOrders?.count && allOrders.count > 0 ? (
          allOrders.data.map((order) => (
            <OrderBill key={order.id} order={order} />
          ))
        ) : (
          <div className="absolute top-2/5 left-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-4 text-white">
            <EmptyImage color="white" />
            <div className="text-st-2">주문 내역이 없습니다.</div>
          </div>
        )}

        <BottomSpace />
      </div>
    </div>
  );
}
