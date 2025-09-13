export const ROUTES = {
  ROOT: '/',
  STORES: {
    ROOT: '/stores',
    DETAIL: (storeId: string = ':storeId') =>
      `${ROUTES.STORES.ROOT}/${storeId}`,
  },
  MENUS: {
    ROOT: '/menus',
    DETAIL: (menuId: string = ':menuId') => `${ROUTES.MENUS.ROOT}/${menuId}`,
  },
  LOGIN: '/login',
  MANAGE_WAITING: '/manage-waiting',
  ORDER: '/order',
  STORE: '/store',
  WAITING: '/waiting',
} as const;
