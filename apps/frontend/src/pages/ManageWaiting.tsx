import BottomSpace from '@/components/common/exceptions/BottomSpace';
import { WaitingCard } from '@/components/pages/manageWaiting/WaitingCard';
import { useEffect } from 'react';
import { useWaiting } from '../hooks/useWaiting';

export default function ManageWaiting() {
  const { waitingList, fetchWaiting } = useWaiting();

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

      <main className="flex flex-col gap-4 bg-gray-400 p-4">
        {waitingList.map((item) => (
          <WaitingCard key={item.id} waitingInfo={item} />
        ))}
        <BottomSpace />
      </main>
    </div>
  );
}
