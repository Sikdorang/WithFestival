import { WaitingCard } from '@/components/pages/waiting/WaitingCard';

// 임시 데이터
const mockWaitingList = [
  {
    id: 1,
    order: 1,
    name: '이상현',
    partySize: 5,
    phone: '010-1234-5678',
    time: '18:50',
  },
  {
    id: 2,
    order: 2,
    name: '김민준',
    partySize: 2,
    phone: '010-2345-6789',
    time: '18:52',
  },
  {
    id: 3,
    order: 3,
    name: '박서연',
    partySize: 4,
    phone: '010-3456-7890',
    time: '18:55',
  },
  {
    id: 4,
    order: 1,
    name: '이상현',
    partySize: 5,
    phone: '010-1234-5678',
    time: '18:50',
  },
  {
    id: 5,
    order: 2,
    name: '김민준',
    partySize: 2,
    phone: '010-2345-6789',
    time: '18:52',
  },
  {
    id: 6,
    order: 3,
    name: '박서연',
    partySize: 4,
    phone: '010-3456-7890',
    time: '18:55',
  },
  {
    id: 7,
    order: 1,
    name: '이상현',
    partySize: 5,
    phone: '010-1234-5678',
    time: '18:50',
  },
  {
    id: 8,
    order: 2,
    name: '김민준',
    partySize: 2,
    phone: '010-2345-6789',
    time: '18:52',
  },
  {
    id: 9,
    order: 3,
    name: '박서연',
    partySize: 4,
    phone: '010-3456-7890',
    time: '18:55',
  },
  {
    id: 10,
    order: 1,
    name: '이상현',
    partySize: 5,
    phone: '010-1234-5678',
    time: '18:50',
  },
  {
    id: 11,
    order: 2,
    name: '김민준',
    partySize: 2,
    phone: '010-2345-6789',
    time: '18:52',
  },
  {
    id: 12,
    order: 3,
    name: '박서연',
    partySize: 4,
    phone: '010-3456-7890',
    time: '18:55',
  },
];

export default function ManageWaiting() {
  return (
    <div className="">
      <header className="p-4">
        <h1 className="text-st-2">
          현재 웨이팅{' '}
          <span className="text-primary-300">{mockWaitingList.length}</span>
        </h1>
      </header>

      <main className="flex flex-col gap-4 bg-gray-400 p-4">
        {mockWaitingList.map((item) => (
          <WaitingCard key={item.id} waitingInfo={item} />
        ))}
      </main>
    </div>
  );
}
