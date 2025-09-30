import ClockIcon from '@/assets/icons/ic_clock.svg?react';
import FoodIcon from '@/assets/icons/ic_food.svg?react';
import ListIcon from '@/assets/icons/ic_list.svg?react';
import HistoryIcon from '@/assets/icons/ic_receipt.svg?react';
export interface Props {
  activeTab: 'timer' | 'list' | 'food' | 'allList';
  onTabClick: (tabName: 'timer' | 'list' | 'food' | 'allList') => void;
  hasNewWaiting: boolean;
}

const TABS = [
  { name: 'timer', Icon: ClockIcon },
  { name: 'list', Icon: ListIcon },
  { name: 'allList', Icon: HistoryIcon },
  { name: 'food', Icon: FoodIcon },
] as const;

export function BottomBar({ activeTab, onTabClick, hasNewWaiting }: Props) {
  return (
    <footer className="fixed right-0 bottom-0 left-0 flex w-full justify-center">
      <div className="flex w-fit w-full items-center justify-around gap-2 rounded-t-3xl bg-white pt-2 pb-4 shadow-lg">
        {TABS.map(({ name, Icon }) => {
          const isActive = activeTab === name;

          return (
            <button
              key={name}
              onClick={() => onTabClick(name)}
              className={`relative rounded-2xl px-4 py-2 transition-colors duration-200 ease-in-out ${isActive ? 'bg-black' : 'bg-transparent'}`}
              aria-label={name}
            >
              <Icon color={isActive ? '#20E988' : '#92949D'} />
              {name === 'timer' && hasNewWaiting && (
                <div className="absolute top-1 right-2 h-2.5 w-2.5 rounded-full border-2 border-white bg-blue-500" />
              )}
            </button>
          );
        })}
      </div>
    </footer>
  );
}
