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
  }, [getUserInfo]);

  useEffect(() => {
    if (name) setStoreNameInput(name);
    if (account) setAccountInput(account);
  }, [name, account]);

  const handleSaveName = () => {
    updateStoreName(storeNameInput);
    setIsWriteStoreName(false);
  };

  const handleCancelName = () => {
    setStoreNameInput(name);
    setIsWriteStoreName(false);
  };

  const handleSaveAccount = () => {
    updateStoreAccount(accountInput);
    setIsWriteAccount(false);
  };

  const handleCancelAccount = () => {
    setAccountInput(account);
    setIsWriteAccount(false);
  };

  return (
    <div>
      <div className="relative mb-4 rounded-2xl bg-gray-100 p-4 shadow-sm">
        <h2 className="text-st-2 mb-3">부스 이름</h2>

        {isWriteStoreName ? (
          <div className="space-y-3">
            <TextInput
              placeholder="부스 이름을 입력해주세요."
              value={storeNameInput}
              onChange={(e) => setStoreNameInput(e.target.value)}
              limitHide
            />
            <div className="flex justify-end gap-2">
              <CtaButton
                text="취소"
                color="white"
                size="small"
                onClick={handleCancelName}
              />
              <CtaButton
                text="저장"
                color="green"
                size="small"
                onClick={handleSaveName}
              />
            </div>
          </div>
        ) : (
          <div>
            <div className="text-b-1">{name || '등록된 이름이 없습니다.'}</div>
            <div className="absolute top-3 right-4">
              <CtaButton
                text={name ? '수정하기' : '등록하기'}
                color="white"
                size="small"
                width="fit"
                onClick={() => setIsWriteStoreName(true)}
              />
            </div>
          </div>
        )}
      </div>

      <div className="relative rounded-2xl bg-gray-100 p-4 shadow-sm">
        <h2 className="text-st-2 mb-3">계좌번호</h2>

        {isWriteAccount ? (
          <div className="space-y-3">
            <TextInput
              placeholder="ex. 은행이름 계좌번호"
              value={accountInput}
              onChange={(e) => setAccountInput(e.target.value)}
              limitHide
            />
            <div className="flex justify-end gap-2">
              <CtaButton
                text="취소"
                color="white"
                size="small"
                onClick={handleCancelAccount}
              />
              <CtaButton
                text="저장"
                color="green"
                size="small"
                onClick={handleSaveAccount}
              />
            </div>
          </div>
        ) : (
          <div>
            <div className="text-b-1">
              {account || '등록된 계좌가 없습니다.'}
            </div>
            <div className="absolute top-3 right-4">
              <CtaButton
                text={account ? '수정하기' : '등록하기'}
                color="white"
                size="small"
                width="fit"
                onClick={() => setIsWriteAccount(true)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

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
