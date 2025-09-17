export interface Menu {
  id: number;
  menu: string;
  price: number;
  description: string;
  image: string;
}

export interface Order {
  id: number;
  menu: string;
  price: number;
  description: string;
  image: string;
}

export interface WaitingDTO {
  name: string;
  phoneNumber: string;
  people: number;
}

export interface IWaitingListItem extends WaitingDTO {
  id: number;
  time: string;
  processed: boolean;
  userId: number;
}

export interface StoreInfo {
  name: string;
  account: string;
}
