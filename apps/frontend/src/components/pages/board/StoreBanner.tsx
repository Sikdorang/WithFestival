import { useState } from 'react';
import NoticeView from './NoticeView';
import RequestModal from './RequestModal';

interface Props {
  boothName: string;
  isPreview: boolean;
  tableNumber?: number;
  notice: string;
}

export default function StoreBanner({
  boothName,
  isPreview,
  tableNumber,
  notice,
}: Props) {
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [requestType, setRequestType] = useState<'message' | 'call'>('message');

  return (
    <div>
      <RequestModal
        open={isRequestModalOpen}
        onClose={() => setIsRequestModalOpen(false)}
        type={requestType}
      />

      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <div className="text-b-2 text-gray-300">{boothName}</div>
          <div className="text-st-2 text-black">
            {isPreview ? '메뉴판 미리보기' : `테이블 번호 ${tableNumber}`}
          </div>
          {isPreview && (
            <div className="text-c-1 flex text-gray-200">
              웨이팅을 기다리며 메뉴를 미리 볼 수 있어요.
            </div>
          )}
        </div>
      </div>
      <NoticeView notice={notice} />
    </div>
  );
}
