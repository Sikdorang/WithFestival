import GoBackIcon from '@/assets/icons/ic_arrow_left.svg?react';
import Navigator from '@/components/common/layouts/Navigator';
import CustomerInquiryItem from './CustomerInquiryItem';
import { IMessage } from '@/types/global';
import { useOrder } from '@/hooks/useOrder';
import { useEffect } from 'react';

interface Props {
  onClose: () => void;
}

export default function CustomerInquiry({ onClose }: Props) {
  const { getMessages, messages, checkMessage } = useOrder();

  useEffect(() => {
    getMessages();
  }, []);

  return (
    <div className="flex h-full flex-col">
      <Navigator
        left={<GoBackIcon />}
        center={<div className="text-st-1">고객 메세지</div>}
        onLeftPress={onClose}
      />

      <main className="flex flex-grow flex-col gap-3 p-4">
        {(messages || []).map((item: IMessage) => (
          <CustomerInquiryItem
            key={item.id}
            inquiry={item}
            checkMessage={checkMessage}
          />
        ))}
      </main>
    </div>
  );
}
