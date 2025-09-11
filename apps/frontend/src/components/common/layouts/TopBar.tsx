import LogoImage from '@/assets/images/img_logo.svg?react';

export function TopBar() {
  return (
    <header className="fixed top-0 left-0 right-0 flex w-full justify-center">
      <div className="flex w-full w-fit items-center gap-2 bg-white px-4 py-3">
          <LogoImage name="logo" />
      </div>
    </header>
  );
}