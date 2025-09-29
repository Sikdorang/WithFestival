import EmptyImage from '@/assets/icons/ic_circle_plus.svg?react';
import BottomSpace from '@/components/common/exceptions/BottomSpace';
import EmptyPlaceHolder from '@/components/common/exceptions/EmptyPlaceHolder';
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
          <EmptyPlaceHolder
            image={<EmptyImage color="white" />}
            text="주문 이력이 없습니다."
          />
        )}

        <BottomSpace />
      </div>
    </div>
  );
}
