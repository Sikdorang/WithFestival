import EmptyImage from '@/assets/icons/ic_circle_plus.svg?react';
import BottomSpace from '@/components/common/exceptions/BottomSpace';
import { OrderCard } from '@/components/pages/order/OrderCard';
import { TopBar } from '@/components/pages/order/TopBar';
import { useOrder } from '@/hooks/useOrder';
import { useEffect, useState } from 'react';

export default function Order() {
  const [orderType, setOrderType] = useState<'pending' | 'sent'>('pending');

  const {
    getPendingOrders,
    getSentOrders,
    pendingOrders,
    sentOrders,
    setOrderSent,
    setOrderCooked,
    deleteOrder,
  } = useOrder();

  useEffect(() => {
    getPendingOrders();
    getSentOrders();
  }, []);

  return (
    <div className="flex min-h-screen flex-1 flex-col gap-4 bg-gray-400">
      <TopBar
        orderCount={
          orderType === 'pending'
            ? pendingOrders?.count || 0
            : sentOrders?.count || 0
        }
        type={orderType}
        onTypeChange={setOrderType}
      />

      <div className="relative flex flex-1 flex-col gap-4 p-4">
        {orderType === 'pending' ? (
          pendingOrders?.count && pendingOrders.count > 0 ? (
            pendingOrders.data.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
                setOrderSent={setOrderSent}
                setOrderCooked={setOrderCooked}
                deleteOrder={deleteOrder}
              />
            ))
          ) : (
            <div className="absolute top-2/5 left-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-4 text-white">
              <EmptyImage color="white" />
              <div className="text-st-2">신규 주문이 없습니다.</div>
            </div>
          )
        ) : sentOrders?.count && sentOrders.count > 0 ? (
          sentOrders.data.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              setOrderSent={setOrderSent}
              setOrderCooked={setOrderCooked}
              deleteOrder={deleteOrder}
            />
          ))
        ) : (
          <div className="absolute top-2/5 left-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-4 text-white">
            <EmptyImage color="white" />
            <div className="text-st-2">송금 완료된 주문이 없습니다.</div>
          </div>
        )}
        <BottomSpace />
      </div>
    </div>
  );
}
