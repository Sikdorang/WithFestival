import CtaButton from '@/components/common/buttons/CtaButton';
import TextInput from '@/components/common/inputs/TextInput';
import BaseResponsiveLayout from '@/components/common/layouts/BaseResponsiveLayout';
import { TopBar } from '@/components/common/layouts/TopBar';
import { useState } from 'react';

const mockWaitingList = [
  {
    id: 1,
    name: '예약자 이름',
    phone: '010-1234-5678',
    partySize: 1,
  },
  {
    id: 2,
    name: '예약자 이름',
    phone: '010-1234-5678',
    partySize: 1,
  },
  {
    id: 3,
    name: '예약자 이름',
    phone: '010-1234-5678',
    partySize: 1,
  },
];

export default function Waiting() {
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [partySize, setPartySize] = useState<number>();

  return (
    <BaseResponsiveLayout>
      <TopBar />

      <main className="flex flex-col items-center justify-center gap-4 p-4">
        <div className="text-t-1 flex gap-4 py-40 pb-25">
          현재 대기팀{' '}
          <span className="text-primary-300">{mockWaitingList.length}</span>
        </div>
        <TextInput
          label="예약자 이름"
          placeholder="예약자 이름을 입력해주세요"
          limitHide
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextInput
          label="전화번호"
          placeholder="전화번호를 입력해주세요"
          limitHide
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <TextInput
          label="입장 인원"
          placeholder="입장 인원을 입력해주세요"
          limitHide
          value={partySize}
          onChange={(e) => setPartySize(Number(e.target.value))}
        />
      </main>

      <footer className="fixed right-0 bottom-0 left-0 flex justify-end gap-2 p-4">
        <CtaButton text="예약하기" radius="xl" />
      </footer>
    </BaseResponsiveLayout>
  );
}
