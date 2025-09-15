import { create } from 'zustand';

interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface OrderState {
  orderItems: OrderItem[];
  depositorName: string;
  addItem: (newItem: Omit<OrderItem, 'quantity'>) => void;
  removeItem: (itemId: number) => void;
  clearOrder: () => void;
  setDepositorName: (name: string) => void;
}

export const useOrderStore = create<OrderState>((set) => ({
  orderItems: [],
  depositorName: '',

  addItem: (newItem) =>
    set((state) => {
      const existingItem = state.orderItems.find(
        (item) => item.id === newItem.id,
      );

      if (existingItem) {
        return {
          orderItems: state.orderItems.map((item) =>
            item.id === newItem.id
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          ),
        };
      } else {
        return {
          orderItems: [...state.orderItems, { ...newItem, quantity: 1 }],
        };
      }
    }),

  removeItem: (itemId) =>
    set((state) => ({
      orderItems: state.orderItems.filter((item) => item.id !== itemId),
    })),

  clearOrder: () => set({ orderItems: [] }),

  setDepositorName: (name) => set({ depositorName: name }),
}));
