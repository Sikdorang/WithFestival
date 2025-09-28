import GoBackIcon from '@/assets/icons/ic_arrow_left.svg?react';
import Navigator from '@/components/common/layouts/Navigator';
import CustomerInquiryItem from './CustomerInquiryItem';
import { IInquiry } from '@/types/global';

interface Props {
  onClose: () => void;
}

const inquiry: IInquiry[] = [
  {
    id: 1,
    message: '안녕하세요',
    tableNumber: '1',
    time: '12:01',
    completed: false,
  },
  {
    id: 2,
    message: '버즈의 가시 틀어줘요',
    tableNumber: '2',
    time: '12:02',
    completed: false,
  },
  {
    id: 3,
    message: '물티슈 주세요',
    tableNumber: '3',
    time: '12:03',
    completed: true,
  },
  {
    id: 4,
    message: '인생이 힘들어요',
    tableNumber: '4',
    time: '12:04',
    completed: true,
  },
  {
    id: 5,
    message: '안녕하세요',
    tableNumber: '1',
    time: '12:01',
    completed: true,
  },
  {
    id: 6,
    message: '버즈의 가시 틀어줘요',
    tableNumber: '2',
    time: '12:02',
    completed: true,
  },
  {
    id: 7,
    message: '물티슈 주세요',
    tableNumber: '3',
    time: '12:03',
    completed: true,
  },
  {
    id: 8,
    message: '인생이 힘들어요',
    tableNumber: '4',
    time: '12:04',
    completed: true,
  },
];

export default function CustomerInquiry({ onClose }: Props) {
  return (
    <div className="flex h-full flex-col">
      <Navigator
        left={<GoBackIcon />}
        center={<div className="text-st-1">고객 문의</div>}
        onLeftPress={onClose}
      />

      <main className="flex flex-grow flex-col gap-3 p-4">
        {inquiry.map((item: IInquiry) => (
          <CustomerInquiryItem key={item.id} inquiry={item} />
        ))}
      </main>
    </div>
  );
}
