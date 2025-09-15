// src/components/layout/TabBarLayout.tsx

import { ROUTES } from '@/constants/routes';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { BottomBar } from './BottomBar';
import TopBar from './TopBar';

export function TabBarLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  // 현재 경로에 따라 activeTab을 동적으로 결정합니다.
  const getActiveTab = () => {
    switch (location.pathname) {
      case ROUTES.MANAGE_WAITING: // 예시 경로
        return 'timer';
      case ROUTES.ORDER: // 예시 경로
        return 'list';
      case ROUTES.STORE: // 예시 경로
        return 'food';
      default:
        return 'timer'; // 기본값
    }
  };

  const handleTabClick = (tabName: 'timer' | 'list' | 'food') => {
    // 탭 클릭 시 해당 경로로 이동시킵니다.
    switch (tabName) {
      case 'timer':
        navigate(ROUTES.MANAGE_WAITING);
        break;
      case 'list':
        navigate(ROUTES.ORDER);
        break;
      case 'food':
        navigate(ROUTES.STORE);
        break;
    }
  };

  return (
    <>
      <TopBar />
      <main className="pt-12 pb-24">
        <Outlet />
      </main>
      <BottomBar activeTab={getActiveTab()} onTabClick={handleTabClick} />
    </>
  );
}
