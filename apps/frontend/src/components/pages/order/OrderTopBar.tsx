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

export default function OrderTopBar({ orderCount, type, onTypeChange }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasNewMessage, setHasNewMessage] = useState(false);

  // useEffect(() => {
  //   // 실제 서버 주소로 변경해야 합니다.
  //   const socket: Socket = io('https://your-server.com');

  //   // 서버에 연결되었을 때
  //   socket.on('connect', () => {
  //     console.log('소켓 서버에 연결되었습니다.');
  //   });

  //   // 'newMessage' 이벤트를 수신했을 때
  //   // (서버에서 보내는 이벤트 이름과 일치해야 합니다.)
  //   socket.on('newMessage', (data) => {
  //     console.log('새 메시지 수신:', data);
  //     setHasNewMessage(true); // 새 메시지가 있음을 상태에 반영
  //   });

  //   // 컴포넌트가 언마운트될 때 소켓 연결 해제
  //   return () => {
  //     socket.disconnect();
  //   };
  // }, []);

  const handleCustomerInquiryClick = () => {
    setHasNewMessage(false);
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
            className="relative cursor-pointer rounded-2xl bg-gray-100 p-3"
            onClick={handleCustomerInquiryClick}
          >
            <MessageIcon />
            {hasNewMessage && (
              <div className="absolute right-2 bottom-3 h-3 w-3 rounded-full border-2 border-white bg-blue-500" />
            )}
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
