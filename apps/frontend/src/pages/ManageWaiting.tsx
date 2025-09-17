import EmptyImage from '@/assets/icons/ic_circle_plus.svg?react';
import BottomSpace from '@/components/common/exceptions/BottomSpace';
import { WaitingCard } from '@/components/pages/manageWaiting/WaitingCard';
import { useEffect } from 'react';
import { useWaiting } from '../hooks/useWaiting';

export default function ManageWaiting() {
  const { waitingList, fetchWaiting, setWaitingProcessed } = useWaiting();

  useEffect(() => {
    fetchWaiting();
  }, []);

  return (
    <div className="">
      <header className="p-4">
        <h1 className="text-st-2">
          현재 웨이팅{' '}
          <span className="text-primary-300">{waitingList.length}</span>
        </h1>
      </header>

      <main className="flex min-h-screen flex-col gap-4 bg-gray-400 p-4">
        {waitingList.length === 0 ? (
          <div className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-4 text-white">
            <EmptyImage color="white" />
            <div className="text-st-2">웨이팅이 없습니다.</div>
          </div>
        ) : (
          <>
            {waitingList.map((item) => (
              <WaitingCard
                key={item.id}
                waitingInfo={item}
                setWaitingProcessed={setWaitingProcessed}
              />
            ))}
          </>
        )}

        <BottomSpace />
      </main>
    </div>
  );
}
