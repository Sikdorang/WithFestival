import ArrowRightLeftIcon from '@/assets/icons/ic_arrow_right_left.svg?react';
import MessageIcon from '@/assets/icons/ic_letter.svg?react';
import { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import CustomerInquiry from './CustomerInquiry';

interface Props {
  orderCount: number;
  type: 'pending' | 'sent';
  onTypeChange: (newType: 'pending' | 'sent') => void;
}

export function TopBar({ orderCount, type, onTypeChange }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCustomerInquiryClick = () => {
    setIsModalOpen(true);
  };

  return (
    <Dialog.Root open={isModalOpen} onOpenChange={setIsModalOpen}>
      <div className="flex w-full items-center justify-between bg-white px-4 py-2">
        <div className="text-st-2 text-black">
          {type === 'pending' ? '신규 주문' : '확정 주문'}{' '}
          <span className="text-primary-300">{orderCount}</span>
        </div>

        <div className="flex flex-row items-center gap-2">
          <div
            className="rounded-2xl bg-gray-100 px-3 py-2"
            onClick={() => {
              handleCustomerInquiryClick();
            }}
          >
            <MessageIcon />
          </div>

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
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/30" />
          <Dialog.Content className="fixed inset-0 z-50 overflow-y-auto bg-white">
            <CustomerInquiry
              onClose={() => {
                setIsModalOpen(false);
              }}
            />
          </Dialog.Content>
        </Dialog.Portal>
      </div>
    </Dialog.Root>
  );
}
