import BottomSpace from '@/components/common/exceptions/BottomSpace';
import EmptyPlaceHolder from '@/components/common/exceptions/EmptyPlaceHolder';
import { OrderCard } from '@/components/pages/order/OrderCard';
import OrderTopBar from '@/components/pages/order/OrderTopBar';
import { useOrder } from '@/hooks/useOrder';
import { useEffect, useState } from 'react';
import EmptyPendingIcon from '@/assets/icons/ic_empty_paper.svg?react';
import EmptySentIcon from '@/assets/icons/ic_empty_paper.svg?react';

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
      <OrderTopBar
        orderCount={
          orderType === 'pending'
            ? pendingOrders?.count || 0
            : sentOrders?.count || 0
        }
        type={orderType}
        onTypeChange={setOrderType}
      />

      <div className="relative flex flex-grow flex-col gap-4 p-4">
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
            <EmptyPlaceHolder
              image={<EmptyPendingIcon color="white" />}
              text="신규 주문이 없습니다."
            />
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
          <EmptyPlaceHolder
            image={<EmptySentIcon color="white" />}
            text="송금 완료된 주문이 없습니다."
          />
        )}
        <BottomSpace />
      </div>
    </div>
  );
}
