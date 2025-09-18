import { ROUTES } from '@/constants/routes';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { BottomBar } from './BottomBar';
import TopBar from './TopBar';

export function TabBarLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const getActiveTab = () => {
    switch (location.pathname) {
      case ROUTES.MANAGE_WAITING:
        return 'timer';
      case ROUTES.ORDER:
        return 'list';
      case ROUTES.STORE:
        return 'food';
      case ROUTES.HISTORY:
        return 'allList';
      default:
        return 'timer';
    }
  };

  const handleTabClick = (tabName: 'timer' | 'list' | 'food' | 'allList') => {
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
      case 'allList':
        navigate(ROUTES.HISTORY);
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
