// src/pages/Order.tsx

import { OrderCard } from '@/components/pages/order/OrderCard';
import { TopBar } from '@/components/pages/order/TopBar';
import { useState } from 'react';

// 임시 데이터 (실제로는 API로 받아옵니다)
const mockOrders = [
  {
    orderNumber: 15,
    time: '18:50',
    items: [
      { name: '메뉴 이름', price: 2500, quantity: 1 },
      { name: '메뉴 이름', price: 2500, quantity: 1 },
      { name: '메뉴 이름', price: 2500, quantity: 1 },
      { name: '메뉴 이름', price: 2500, quantity: 1 },
    ],
    totalAmount: 10000,
    totalQuantity: 4,
    depositorName: '이상현',
  },
  {
    orderNumber: 15,
    time: '18:50',
    items: [
      { name: '메뉴 이름', price: 2500, quantity: 1 },
      { name: '메뉴 이름', price: 2500, quantity: 1 },
      { name: '메뉴 이름', price: 2500, quantity: 1 },
      { name: '메뉴 이름', price: 2500, quantity: 1 },
    ],
    totalAmount: 10000,
    totalQuantity: 4,
    depositorName: '이상현',
  },
  {
    orderNumber: 15,
    time: '18:50',
    items: [
      { name: '메뉴 이름', price: 2500, quantity: 1 },
      { name: '메뉴 이름', price: 2500, quantity: 1 },
      { name: '메뉴 이름', price: 2500, quantity: 1 },
      { name: '메뉴 이름', price: 2500, quantity: 1 },
    ],
    totalAmount: 10000,
    totalQuantity: 4,
    depositorName: '이상현',
  },
  // ... 다른 주문 데이터
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
    </div>
  );
}
