import DeleteConfirmModal from '@/components/common/modals/DeleteConfirmModal';
interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface Order {
  orderNumber: number;
  time: string;
  items: OrderItem[];
  totalAmount: number;
  totalQuantity: number;
  depositorName: string;
}

interface Props {
  order: Order;
  isConfirm: boolean;
}

export function OrderCard({ order, isConfirm = false }: Props) {
  return (
    <div className="space-y-3 rounded-lg bg-white p-4">
      <div className="flex items-center justify-between">
        <span className="rounded-lg bg-black px-3 py-1 font-bold text-white">
          {order.orderNumber}번
        </span>
        <span className="text-gray-400">{order.time}</span>
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
          <button className="rounded-2xl bg-gray-100 py-3 text-black">
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
            <button className="bg-primary-300 rounded-2xl py-3 font-bold text-black">
              송금 확인
            </button>
          </div>

          <div className="flex items-center gap-4 rounded-xl bg-gray-100 p-3 px-8">
            <span className="text-sm text-gray-400">입금자명</span>
            <p className="text-gray-black">{order.depositorName}</p>
          </div>
        </div>
      )}
    </div>
  );
}
