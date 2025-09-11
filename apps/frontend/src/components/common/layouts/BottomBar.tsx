import ClockIcon from '@/assets/icons/ic_clock.svg?react';
import FoodIcon from '@/assets/icons/ic_food.svg?react';
import ListIcon from '@/assets/icons/ic_list.svg?react';

// 1. Props에 대한 TypeScript 인터페이스 정의
export interface Props {
  /** 현재 활성화된 탭의 이름 */
  activeTab: 'timer' | 'list' | 'food';
  /** 탭을 클릭했을 때 호출될 함수 */
  onTabClick: (tabName: 'timer' | 'list' | 'food') => void;
}

// 탭 정보를 배열로 관리하여 확장성을 높입니다.
const TABS = [
  { name: 'timer', Icon: ClockIcon },
  { name: 'list', Icon: ListIcon },
  { name: 'food', Icon: FoodIcon },
] as const; // 'as const'로 타입 추론을 더 정확하게 만듭니다.

/**
 * 화면 하단에 고정되는 탭 바 컴포넌트
 */
export function BottomBar({ activeTab, onTabClick }: Props) {
  return (
    // 화면 하단에 고정시키기 위한 wrapper
    <footer className="fixed right-0 bottom-0 left-0 flex w-full justify-center">
      {/* 탭 바의 실제 UI */}
      <div className="flex w-fit w-full items-center justify-around gap-2 rounded-t-3xl bg-white pt-2 pb-4 shadow-lg">
        {TABS.map(({ name, Icon }) => {
          const isActive = activeTab === name;

          return (
            <button
              key={name}
              onClick={() => onTabClick(name)}
              // 활성화 상태에 따라 다른 스타일 적용
              className={`rounded-full p-3 transition-colors duration-200 ease-in-out ${isActive ? 'bg-gray-black' : 'bg-transparent'}`}
              aria-label={name}
            >
              <Icon
                className={`h-7 w-7 ${isActive ? 'text-white' : 'text-gray-400'}`}
              />
            </button>
          );
        })}
      </div>
    </footer>
  );
}
