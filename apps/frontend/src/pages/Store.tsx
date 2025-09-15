import CtaButton from '@/components/common/buttons/CtaButton';
import TextInput from '@/components/common/inputs/TextInput';
import { ROUTES } from '@/constants/routes';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const mockMenuList = [
  { id: 1, name: '아롱사태 수육', price: 25000 },
  { id: 2, name: '돼지국밥', price: 18000 },
  { id: 3, name: '파전', price: 22000 },
  { id: 1, name: '아롱사태 수육', price: 25000 },
  { id: 2, name: '돼지국밥', price: 18000 },
  { id: 3, name: '파전', price: 22000 },
  { id: 1, name: '아롱사태 수육', price: 25000 },
  { id: 2, name: '돼지국밥', price: 18000 },
  { id: 3, name: '파전', price: 22000 },
];

function AccountSection() {
  const [isWriteAccount, setIsWriteAccount] = useState(false);
  const [isWriteStoreName, setIsWriteStoreName] = useState(false);

  const [accountNumber, setAccountNumber] = useState('');
  const [storeName, setStoreName] = useState('');

  return (
    <div>
      <div className="mb-4 rounded-2xl bg-gray-100 p-4 shadow-sm">
        <h2 className="text-st-2 mb-3">부스 이름</h2>
        {isWriteStoreName && (
          <div className="mb-4">
            <TextInput
              placeholder="부스 이름을 입력해주세요."
              value={storeName}
              onChange={(e) => setStoreName(e.target.value)}
              limitHide
            />
          </div>
        )}
        <CtaButton
          color={isWriteStoreName ? 'green' : 'white'}
          size="small"
          radius="_2xl"
          text={isWriteStoreName ? '입력완료' : '등록하기'}
          onClick={() => setIsWriteStoreName(true)}
        />
      </div>
      <div className="rounded-2xl bg-gray-100 p-4 shadow-sm">
        <h2 className="text-st-2 mb-3">계좌번호</h2>
        {isWriteAccount && (
          <div className="mb-4">
            <TextInput
              placeholder="ex.은행이름 & 계좌번호 (13자리)"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              limitHide
            />
          </div>
        )}
        <CtaButton
          color={isWriteAccount ? 'green' : 'white'}
          size="small"
          radius="_2xl"
          text={isWriteAccount ? '입력완료' : '등록하기'}
          onClick={() => setIsWriteAccount(true)}
        />
      </div>
    </div>
  );
}

// 메뉴 아이템
function MenuItem({
  name,
  price,
  onClick,
}: {
  name: string;
  price: number;
  onClick: () => void;
}) {
  return (
    <div className="flex items-center justify-between py-4" onClick={onClick}>
      <div>
        <h3 className="text-body-1 text-gray-black font-semibold">{name}</h3>
        <p className="text-body-1 text-gray-black font-bold">
          {price.toLocaleString()}원
        </p>
      </div>
      <div className="h-30 w-30 rounded-md bg-gray-100" />
    </div>
  );
}

// 메뉴 리스트 섹션
function MenuList() {
  const navigate = useNavigate();
  return (
    <div className="rounded-lg bg-white p-4">
      {mockMenuList.map((item) => (
        <MenuItem
          key={item.id}
          name={item.name}
          price={item.price}
          onClick={() => {
            navigate(ROUTES.MANAGE_MENUS.DETAIL(item.id.toString()));
          }}
        />
      ))}
    </div>
  );
}

function AddMenuButton() {
  const navigate = useNavigate();
  return (
    <div className="fixed right-4 bottom-24 rounded-xl shadow-lg">
      <CtaButton
        text="메뉴 추가"
        radius="xl"
        onClick={() => {
          navigate(ROUTES.MANAGE_MENUS.DETAIL('0'));
        }}
      />
    </div>
  );
}

export default function Store() {
  return (
    <div className="relative min-h-screen space-y-4 bg-white p-4">
      <AccountSection />
      <MenuList />
      <AddMenuButton />
    </div>
  );
}
