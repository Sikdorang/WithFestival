import axiosInstance from '.';

export const storeAPI = {
  getStoreInfo: async () => {
    const response = await axiosInstance.get('/store');
    return response.data;
  },

  updateStoreInfo: async (account: string) => {
    const response = await axiosInstance.patch('/user/account', account);
    return response.data;
  },

  updateStoreName: async (name: string) => {
    const response = await axiosInstance.patch('/user/name', name);
    return response.data;
  },
};
