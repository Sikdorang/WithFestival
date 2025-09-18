import EmptyImage from '@/assets/images/img_empty_image.svg?react';
import CtaButton from '@/components/common/buttons/CtaButton';
import TextInput from '@/components/common/inputs/TextInput';
import { ROUTES } from '@/constants/routes';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMenu } from '../hooks/useMenu';
import { useStore } from '../hooks/useStore';

const IMAGE_PREFIX = import.meta.env.VITE_IMAGE_PREFIX;

function AccountSection() {
  const { updateStoreName, updateStoreAccount, getUserInfo, account, name } =
    useStore();

  const [isWriteAccount, setIsWriteAccount] = useState(false);
  const [isWriteStoreName, setIsWriteStoreName] = useState(false);

  const [storeNameInput, setStoreNameInput] = useState('');
  const [accountInput, setAccountInput] = useState('');

  useEffect(() => {
    getUserInfo();
  }, []);

  useEffect(() => {
    setStoreNameInput(name);
    setAccountInput(account);
  }, [name, account]);

  const handleWriteStoreName = () => {
    setIsWriteStoreName(true);

    if (isWriteStoreName) {
      updateStoreName(storeNameInput);
      setIsWriteStoreName(false);
    }
  };

  const handleWriteAccount = () => {
    setIsWriteAccount(true);

    if (isWriteAccount) {
      updateStoreAccount(accountInput);
      setIsWriteAccount(false);
    }
  };

  return (
    <div>
      <div className="relative mb-4 rounded-2xl bg-gray-100 p-4 shadow-sm">
        <h2 className="text-st-2 mb-3">부스 이름</h2>
        {isWriteStoreName && (
          <div className="mb-4">
            <TextInput
              placeholder="부스 이름을 입력해주세요."
              value={storeNameInput}
              onChange={(e) => setStoreNameInput(e.target.value)}
              limitHide
            />
          </div>
        )}

        {!name && (
          <CtaButton
            color={isWriteStoreName ? 'green' : 'white'}
            size="small"
            radius="_2xl"
            text={isWriteStoreName ? '입력완료' : '등록하기'}
            onClick={handleWriteStoreName}
          />
        )}

        {name && !isWriteStoreName && (
          <>
            <div className="text-b-1">{name}</div>
            <div className="absolute top-3 right-4">
              <CtaButton
                color="white"
                size="small"
                width="fit"
                radius="_2xl"
                text="수정하기"
                onClick={() => setIsWriteStoreName(true)}
              />
            </div>
          </>
        )}
      </div>

      <div className="relative rounded-2xl bg-gray-100 p-4 shadow-sm">
        <h2 className="text-st-2 mb-3">계좌번호</h2>
        {isWriteAccount && (
          <div className="mb-4">
            <TextInput
              placeholder="ex.은행이름 & 계좌번호 (13자리)"
              value={accountInput}
              onChange={(e) => setAccountInput(e.target.value)}
              limitHide
            />
          </div>
        )}
        {!account && (
          <CtaButton
            color={isWriteAccount ? 'green' : 'white'}
            size="small"
            radius="_2xl"
            text={isWriteAccount ? '입력완료' : '등록하기'}
            onClick={handleWriteAccount}
          />
        )}

        {account && !isWriteAccount && (
          <>
            <div className="text-b-1">{account}</div>
            <div className="absolute top-3 right-4">
              <CtaButton
                color="white"
                size="small"
                width="fit"
                radius="_2xl"
                text="수정하기"
                onClick={() => setIsWriteAccount(true)}
              />
            </div>
          </>
        )}
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
        <img
          className="flex aspect-square max-w-[200px] flex-1 rounded-2xl bg-gray-100"
          src={`${IMAGE_PREFIX}${image}`}
        />
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
  const { menus, fetchMenu } = useMenu();

  useEffect(() => {
    fetchMenu();
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
