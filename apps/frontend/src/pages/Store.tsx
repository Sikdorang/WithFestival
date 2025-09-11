// src/pages/Store.tsx

// === 1. 데이터 정의 ===
// 실제 앱에서는 API를 통해 받아올 메뉴 데이터입니다.
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

// === 2. UI 섹션별 컴포넌트 ===

// 계좌번호 섹션
function AccountSection() {
  return (
    <div className="rounded-lg bg-gray-100 p-4 shadow-sm">
      <h2 className="text-body-1 font-semibold">계좌번호</h2>
      <button className="mt-2 w-full rounded-2xl border border-gray-200 bg-white py-3 text-center text-black">
        등록하기
      </button>
    </div>
  );
}

// 메뉴 아이템
function MenuItem({ name, price }: { name: string; price: number }) {
  return (
    // 마지막 아이템에는 하단 경계선 제거
    <div className="flex items-center justify-between py-4">
      <div>
        <h3 className="text-body-1 text-gray-black font-semibold">{name}</h3>
        <p className="text-body-1 text-gray-black font-bold">
          {price.toLocaleString()}원
        </p>
      </div>
      {/* 이미지 썸네일 */}
      <div className="h-30 w-30 rounded-md bg-gray-100" />
    </div>
  );
}

// 메뉴 리스트 섹션
function MenuList() {
  return (
    <div className="rounded-lg bg-white p-4">
      {mockMenuList.map((item) => (
        <MenuItem key={item.id} name={item.name} price={item.price} />
      ))}
    </div>
  );
}

// 메뉴 추가 플로팅 버튼
function AddMenuButton() {
  return (
    // 하단 탭바 높이를 고려하여 bottom-24 설정 (탭바가 없다면 bottom-4)
    <div className="fixed right-4 bottom-24">
      <button className="bg-primary-300 rounded-2xl px-6 py-3 font-bold text-black shadow-lg">
        메뉴 추가
      </button>
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
