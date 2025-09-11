// src/pages/Store.tsx


// === 1. 데이터 정의 ===
// 실제 앱에서는 API를 통해 받아올 메뉴 데이터입니다.
const mockMenuList = [
  { id: 1, name: '침소라 무침', price: 25000 },
  { id: 2, name: '해물 파전', price: 18000 },
  { id: 3, name: '골뱅이 소면', price: 22000 },
];

// === 2. UI 섹션별 컴포넌트 ===

// 계좌번호 섹션
function AccountSection() {
  return (
    <div className="rounded-lg bg-gray-100 p-4 shadow-sm">
      <h2 className="text-body-1 font-semibold">계좌번호</h2>
      <button className="mt-2 w-full rounded-2xl bg-white border border-gray-200 py-3 text-center text-gray-300">
        등록하기
      </button>
    </div>
  );
}

// 메뉴 아이템
function MenuItem({ name, price }: { name: string; price: number }) {
  return (
    // 마지막 아이템에는 하단 경계선 제거
    <div className="flex items-center justify-between border-b border-gray-100 py-4 last:border-b-0">
      <div>
        <h3 className="text-body-1 font-semibold text-gray-black">{name}</h3>
        <p className="text-body-1 font-bold text-gray-black">
          {price.toLocaleString()}원
        </p>
      </div>
      {/* 이미지 썸네일 */}
      <div className="h-20 w-20 rounded-md bg-gray-100" />
    </div>
  );
}

// 메뉴 리스트 섹션
function MenuList() {
  return (
    <div className="rounded-lg bg-white p-4 shadow-sm">
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
    <div className="fixed bottom-24 right-4">
      <button className="rounded-2xl bg-primary-300 px-6 py-3 font-bold text-black shadow-lg">
        메뉴 추가
      </button>
    </div>
  );
}

// === 3. 페이지 전체 렌더링 ===

export default function Store() {
  return (
    // relative: 플로팅 버튼의 기준점이 됨
    <div className="relative min-h-screen space-y-4 bg-white p-4">
      <AccountSection />
      <MenuList />
      <AddMenuButton />
    </div>
  );
}