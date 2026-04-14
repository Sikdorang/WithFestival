import CtaButton from '@/components/common/buttons/CtaButton';
import StoreInformation from '@/components/pages/store/StoreInformation';
import { ROUTES } from '@/constants/routes';
import { useStore } from '@/hooks/useStore';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TopBar from '../components/common/layouts/TopBar';
import MenuList from '../components/pages/board/MenuList';
import { Menu } from '../types/global';

export default function Store() {
  const navigate = useNavigate();
  const { getUserInfo, account, name } = useStore();

  useEffect(() => {
    getUserInfo();
  }, []);

  const handleMenuItemClick = (item: Menu) => {
    navigate(ROUTES.MANAGE_MENUS.DETAIL(item.id.toString()));
  };

  return (
    <div className="relative min-h-screen space-y-4 bg-white">
      <TopBar />
      <div className="p-4">
        <StoreInformation name={name} account={account} />
        <MenuList onMenuItemClick={handleMenuItemClick} />
        <div className="fixed right-4 bottom-30 rounded-xl">
          <CtaButton
            text="메뉴 추가"
            radius="xl"
            onClick={() => {
              navigate(ROUTES.MANAGE_MENUS.DETAIL('0'));
            }}
          />
        </div>
      </div>
    </div>
  );
}
