import { SUCCESS_MESSAGES } from '@/constants/message';
import { IWaitingListItem } from '@/types/global';
import { useMemo } from 'react';
import toast from 'react-hot-toast';
interface Props {
  waitingInfo: IWaitingListItem;
  setWaitingProcessed: (waitingId: number) => void;
}

export function WaitingCard({ waitingInfo, setWaitingProcessed }: Props) {
  const { name, people, phoneNumber, time } = waitingInfo;

  const isMobile = useMemo(() => /Mobi/i.test(window.navigator.userAgent), []);
  const formattedPhone = useMemo(
    () => phoneNumber.replace(/-/g, ''),
    [phoneNumber],
  );

  const InfoItem = ({
    label,
    value,
  }: {
    label: string;
    value: string | number;
  }) => (
    <div className="flex flex-col items-center justify-center gap-1">
      <p className="text-c-1 text-gray-300">{label}</p>
      <p className="text-b-1 text-gray-black">{value}</p>
    </div>
  );

  return (
    <div className="space-y-4 rounded-xl bg-white p-4 shadow-md">
      <div className="flex items-center justify-between">
        <span className="rounded-full bg-black px-3 py-1 text-sm font-bold text-white">
          {waitingInfo.id}번
        </span>
        <span className="font-medium text-gray-400">{time}</span>
      </div>

      <div className="grid grid-cols-3">
        <InfoItem label="예약자 이름" value={name} />
        <InfoItem label="인원" value={`${people}명`} />
        <div className="flex flex-col items-center justify-center gap-1">
          <p className="text-c-1 text-gray-300">전화번호</p>
          <a
            href={isMobile ? `tel:${formattedPhone}` : undefined}
            className="text-b-1 text-gray-black"
            onClick={(e) => e.stopPropagation()}
          >
            {phoneNumber}
          </a>
        </div>
      </div>

      <div className="text-b-2 flex gap-2">
        <a
          href={isMobile ? `tel:${formattedPhone}` : undefined}
          className="text-gray-black flex flex-1 items-center justify-center rounded-3xl bg-gray-100 py-3 font-bold"
          onClick={(e) => e.stopPropagation()}
        >
          전화하기
        </a>
        <button
          className="flex-1 rounded-2xl bg-red-500 py-3 font-bold text-white"
          onClick={() => {
            setWaitingProcessed(waitingInfo.id);
            toast.success(SUCCESS_MESSAGES.waitingCancelSuccess);
          }}
        >
          취소
        </button>
        <button
          className="bg-primary-300 flex-1 rounded-2xl py-3 font-bold text-black"
          onClick={() => {
            setWaitingProcessed(waitingInfo.id);
            toast.success(SUCCESS_MESSAGES.waitingSuccess);
          }}
        >
          착석
        </button>
      </div>
    </div>
  );
}
