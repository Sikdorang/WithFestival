import GoBackIcon from '@/assets/icons/ic_arrow_left.svg?react';
import Navigator from '@/components/common/layouts/Navigator';
import ManageBoothItem from './ManageBoothItem';
import { useStore } from '@/hooks/useStore';
import { useEffect, useState } from 'react';

interface Props {
  onClose: () => void;
}

export default function ManageBooth({ onClose }: Props) {
  const {
    updateStoreName,
    updateStoreAccount,
    getUserInfo,
    account,
    name,
    notice,
    event,
    updateStoreNotice,
    updateStoreEvent,
  } = useStore();

  const [storeNameInput, setStoreNameInput] = useState('');
  const [accountInput, setAccountInput] = useState('');
  const [noticeInput, setNoticeInput] = useState('');
  const [eventInput, setEventInput] = useState('');

  useEffect(() => {
    getUserInfo();
  }, []);

  useEffect(() => {
    if (name) setStoreNameInput(name);
    if (account) setAccountInput(account);
    if (notice) setNoticeInput(notice);
    if (event) setEventInput(event);
  }, [name, account, notice, event]);

  return (
    <div className="flex h-full flex-col">
      <Navigator
        left={<GoBackIcon />}
        center={<div className="text-st-1">부스 관리하기</div>}
        onLeftPress={onClose}
      />

      <main className="flex flex-grow flex-col gap-3 p-4">
        <ManageBoothItem
          title="부스 이름"
          value={storeNameInput || '등록된 부스 이름이 없습니다.'}
          placeholder="부스 이름을 입력해주세요."
          onSave={() => {
            updateStoreName(storeNameInput);
          }}
        />
        <ManageBoothItem
          title="계좌번호"
          value={accountInput || '등록된 계좌번호가 없습니다.'}
          placeholder="계좌번호를 입력해주세요."
          onSave={() => {
            updateStoreAccount(accountInput);
          }}
        />
        <ManageBoothItem
          title="공지사항"
          value={noticeInput || '등록된 공지사항이 없습니다.'}
          placeholder="공지사항을 입력해주세요."
          onSave={() => {
            updateStoreNotice(noticeInput);
          }}
        />
        <ManageBoothItem
          title="이벤트"
          value={eventInput || '등록된 이벤트가 없습니다.'}
          placeholder="이벤트를 입력해주세요."
          onSave={() => {
            updateStoreEvent(eventInput);
          }}
        />
      </main>
    </div>
  );
}
