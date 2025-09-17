import EmptyImage from '@/assets/images/img_empty_image.svg?react';
import CtaButton from '@/components/common/buttons/CtaButton';
import TextInput from '@/components/common/inputs/TextInput';
import { ROUTES } from '@/constants/routes';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMenu } from '../hooks/useMenu';
import { useStore } from '../hooks/useStore';

function AccountSection() {
  const { updateStoreName, updateStoreAccount } = useStore();

  const [isWriteAccount, setIsWriteAccount] = useState(false);
  const [isWriteStoreName, setIsWriteStoreName] = useState(false);

  const [accountNumber, setAccountNumber] = useState('');
  const [storeName, setStoreName] = useState('');

  const handleWriteStoreName = () => {
    setIsWriteStoreName(true);

    if (isWriteStoreName) {
      updateStoreName(storeName);
    }
  };

  const handleWriteAccount = () => {
    setIsWriteAccount(true);

    if (isWriteAccount) {
      updateStoreAccount(accountNumber);
    }
  };

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
          onClick={handleWriteStoreName}
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
          onClick={handleWriteAccount}
        />
      </div>
    </div>
  );
}

// 메뉴 아이템
function MenuItem({
  name,
  price,
  image,
  onClick,
}: {
  name: string;
  price: number;
  image: string;
  onClick: () => void;
}) {
  return (
    <div className="w-fullitems-center flex py-4" onClick={onClick}>
      <div className="flex-1 text-left">
        <h3 className="text-b-1 text-gray-400">{name}</h3>
        <p className="text-st-1 text-gray-800">{price.toLocaleString()}원</p>
      </div>
      {image ? (
        <img className="h-20 w-20 rounded-md bg-gray-100" src={image} />
      ) : (
        <div className="flex aspect-square flex-1 items-center justify-center rounded-3xl bg-gray-100">
          <EmptyImage />
        </div>
      )}
    </div>
  );
}

// 메뉴 리스트 섹션
function MenuList() {
  const navigate = useNavigate();
  const location = useLocation();
  const { menus, getMenuByUserId } = useMenu();
  const userData =
    location.state?.userData ||
    JSON.parse(sessionStorage.getItem('userData') || '{}');

  useEffect(() => {
    getMenuByUserId(userData.userId);
  }, []);
  return (
    <div className="rounded-lg bg-white p-4">
      {menus.map((item) => (
        <MenuItem
          key={item.id}
          name={item.menu}
          price={item.price}
          image={item.image}
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
