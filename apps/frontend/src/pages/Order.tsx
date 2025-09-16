import BottomSpace from '@/components/common/exceptions/BottomSpace';
import { OrderCard } from '@/components/pages/order/OrderCard';
import { TopBar } from '@/components/pages/order/TopBar';
import { useState } from 'react';

const mockOrders = [
  {
    orderNumber: 15,
    tableNumber: 1,
    time: '18:50',
    items: [
      { id: 1, name: '메뉴 이름', price: 2500, quantity: 1 },
      { id: 2, name: '메뉴 이름', price: 2500, quantity: 1 },
      { id: 3, name: '메뉴 이름', price: 2500, quantity: 1 },
      { id: 4, name: '메뉴 이름', price: 2500, quantity: 1 },
    ],
    totalAmount: 10000,
    totalQuantity: 4,
    depositorName: '이상현',
  },
  {
    orderNumber: 16,
    tableNumber: 2,
    time: '18:50',
    items: [
      { id: 1, name: '메뉴 이름', price: 2500, quantity: 1 },
      { id: 2, name: '메뉴 이름', price: 2500, quantity: 1 },
      { id: 3, name: '메뉴 이름', price: 2500, quantity: 1 },
      { id: 4, name: '메뉴 이름', price: 2500, quantity: 1 },
    ],
    totalAmount: 10000,
    totalQuantity: 4,
    depositorName: '이상현',
  },
  {
    orderNumber: 17,
    tableNumber: 3,
    time: '18:50',
    items: [
      { id: 1, name: '메뉴 이름', price: 2500, quantity: 1 },
      { id: 2, name: '메뉴 이름', price: 2500, quantity: 1 },
      { id: 3, name: '메뉴 이름', price: 2500, quantity: 1 },
      { id: 4, name: '메뉴 이름', price: 2500, quantity: 1 },
    ],
    totalAmount: 10000,
    totalQuantity: 4,
    depositorName: '이상현',
  },
];

export default function Order() {
  const [orderType, setOrderType] = useState<'new' | 'confirm'>('new');
  return (
    <div className="flex flex-col gap-4 bg-gray-400">
      <TopBar
        orderCount={mockOrders.length}
        type={orderType}
        onTypeChange={setOrderType}
      />

      <div className="flex flex-col gap-4 p-4">
        {mockOrders.map((order) => (
          <OrderCard
            key={order.orderNumber}
            order={order}
            isConfirm={orderType === 'confirm'}
          />
        ))}
      </div>
      <BottomSpace />
    </div>
  );
}
