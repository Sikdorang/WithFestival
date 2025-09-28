import { IInquiry } from '@/types/global';
import CheckIcon from '@/assets/icons/ic_check.svg?react';

interface Props {
  inquiry: IInquiry;
}

export default function CustomerInquiryItem({ inquiry }: Props) {
  return (
    <div className="flex items-center justify-between rounded-xl bg-gray-100 p-4">
      <div className="flex flex-col gap-2">
        <div className="text-st-2">{inquiry.message} </div>
        <div className="text-b-1 flex items-center gap-1">
          <div className="text-c-1 rounded-full bg-gray-200 px-1 py-0.5">
            {inquiry.time}
          </div>
          <div>테이블 번호 {inquiry.tableNumber}</div>
        </div>
      </div>

      <div
        className={`${inquiry.completed ? 'bg-gray-300' : 'bg-primary-200'} aspect-square items-center justify-center rounded-full p-1`}
      >
        {inquiry.completed ? (
          <CheckIcon width={14} height={14} />
        ) : (
          <CheckIcon width={14} height={14} />
        )}
      </div>
    </div>
  );
}
