import axiosInstance from '.';

export const orderAPI = {
  login: async (code: string) => {
    const response = await axiosInstance.post('/auth/login', { code });
    return response.data;
  },

  createOrder: async (order: Order) => {
    const response = await axiosInstance.post('/order', order);
    return response.data;
  },

  updateOrder: async (order: Order) => {
    const response = await axiosInstance.patch('/order', order);
    return response.data;
  },

  deleteOrder: async (orderId: string) => {
    const response = await axiosInstance.delete(`/order/${orderId}`);
    return response.data;
  },
};
