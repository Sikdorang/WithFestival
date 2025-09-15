export const ROUTES = {
  ROOT: '/',
  STORES: {
    ROOT: '/stores',
    DETAIL: (storeId: string = ':storeId') =>
      `${ROUTES.STORES.ROOT}/${storeId}`,
  },
  MANAGE_MENUS: {
    ROOT: '/manage-menus',
    DETAIL: (menuId: string = ':menuId') =>
      `${ROUTES.MANAGE_MENUS.ROOT}/${menuId}`,
  },
  MENUS: {
    ROOT: '/menus',
    DETAIL: (menuId: string = ':menuId') => `${ROUTES.MENUS.ROOT}/${menuId}`,
  },
  GAMES: {
    ROOT: '/games',
    DETAIL: (gameId: string = ':gameId') => `${ROUTES.GAMES.ROOT}/${gameId}`,
  },
  LOGIN: '/login',
  MANAGE_WAITING: '/manage-waiting',
  ORDER: '/order',
  STORE: '/store',
  WAITING: '/waiting',
  MENU_BOARD: {
    ROOT: '/board',
    DETAIL: (menuId: string = ':menuId') =>
      `${ROUTES.MENU_BOARD.ROOT}/${menuId}`,
  },
  ORDERING: {
    ROOT: '/ordering',
    DETAIL: (storeId: string = ':storeId') =>
      `${ROUTES.ORDERING.ROOT}/${storeId}`,
  },
} as const;
