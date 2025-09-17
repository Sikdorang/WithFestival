import ArrowRightLeftIcon from '@/assets/icons/ic_arrow_right_left.svg?react';

interface Props {
  orderCount: number;
  type: 'pending' | 'sent';
  onTypeChange: (newType: 'pending' | 'sent') => void;
}

export function TopBar({ orderCount, type, onTypeChange }: Props) {
  return (
    <div className="flex w-full items-center justify-between bg-white px-4 py-2">
      <h2 className="text-st-2 text-black">
        {type === 'pending' ? '신규 주문' : '확정 주문'}{' '}
        <span className="text-primary-300">{orderCount}</span>
      </h2>

      {type === 'pending' ? (
        <button
          onClick={() => onTypeChange('sent')}
          className="text-c-1 flex items-center gap-1 rounded-xl bg-gray-400 px-5 py-2 text-white"
        >
          송금 전 <ArrowRightLeftIcon />
        </button>
      ) : (
        <button
          onClick={() => onTypeChange('pending')}
          className="text-c-1 bg-primary-400 flex items-center gap-1 rounded-xl px-5 py-2 text-white"
        >
          송금 완료 <ArrowRightLeftIcon />
        </button>
      )}
    </div>
  );
}
