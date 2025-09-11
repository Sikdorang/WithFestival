// src/pages/Order.tsx

import ArrowRightLeftIcon from '@/assets/icons/ic_arrow_right_left.svg?react'; // react-icons 라이브러리 아이콘
import { OrderCard } from '@/components/pages/order/OrderCard';

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
  return (
    <div className="flex flex-col gap-4 bg-gray-400">
      
        <div className="flex w-full items-center bg-white justify-between py-2 px-4 ">
          <h2 className="text-st-2 text-black">
            신규 주문{' '}
            <span className="text-primary-300">{mockOrders.length}</span>
          </h2>
          <button className="flex items-center gap-1 rounded-xl bg-gray-400 px-5 py-2 text-c-1 text-white">
            송금전 <ArrowRightLeftIcon />
          </button>
        </div>
        
      
      <div className="flex flex-col gap-4 p-4">
        {mockOrders.map((order) => (
          <OrderCard key={order.orderNumber} order={order} />
        ))}
      </div>
    </div>
  );
}