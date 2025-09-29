import BottomSpace from '@/components/common/exceptions/BottomSpace';
import EmptyPlaceHolder from '@/components/common/exceptions/EmptyPlaceHolder';
import { OrderCard } from '@/components/pages/order/OrderCard';
import OrderTopBar from '@/components/pages/order/OrderTopBar';
import { useOrder } from '@/hooks/useOrder';
import { useEffect, useState } from 'react';
import EmptyPendingIcon from '@/assets/icons/ic_empty_paper.svg?react';
import EmptySentIcon from '@/assets/icons/ic_empty_paper.svg?react';
// import { toast } from 'react-hot-toast';
import { OrderSummary } from '@/types/global';
import ServiceOrderCard from '@/components/pages/order/ServiceOrderCard';
// const notificationSound = new Audio('/sounds/notification.mp3');

const isServiceOrder = (order: OrderSummary): boolean => {
  const singleItem = order.orderUsers?.[0];
  return (
    order.name === '직원 호출' &&
    order.orderUsers?.length === 1 &&
    singleItem?.price === 0 &&
    singleItem?.count === 0
  );
};

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

  // useEffect(() => {
  //   const socket: Socket = io('https://your-server.com');

  //   const handleNewOrder = () => {
  //     notificationSound.play().catch((error) => {
  //       console.error('알림음 재생 오류:', error);
  //     });

  //     toast('🔔 신규 주문이 들어왔어요!', {
  //       duration: 4000,
  //       position: 'top-center',
  //     });

  //     getPendingOrders();
  //     getSentOrders();
  //   };

  //   socket.on('newOrder', handleNewOrder);

  //   return () => {
  //     socket.off('newOrder', handleNewOrder);
  //     socket.disconnect();
  //   };
  // }, [getPendingOrders, getSentOrders]);

  const renderOrderList = (orders: OrderSummary[]) => {
    return orders.map((order) =>
      isServiceOrder(order) ? (
        <ServiceOrderCard
          key={order.id}
          order={order}
          deleteOrder={deleteOrder}
          setOrderSent={setOrderSent}
          setOrderCooked={setOrderCooked}
        />
      ) : (
        <OrderCard
          key={order.id}
          order={order}
          setOrderSent={setOrderSent}
          setOrderCooked={setOrderCooked}
          deleteOrder={deleteOrder}
        />
      ),
    );
  };

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
            renderOrderList(pendingOrders.data)
          ) : (
            <EmptyPlaceHolder
              image={<EmptyPendingIcon color="white" />}
              text="신규 주문이 없습니다."
            />
          )
        ) : sentOrders?.count && sentOrders.count > 0 ? (
          renderOrderList(sentOrders.data)
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
