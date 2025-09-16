import axiosInstance from '.';

export const waitingAPI = {
  getWaiting: async () => {
    const response = await axiosInstance.get('/waiting');
    return response.data;
  },

  createWaiting: async (waiting: Waiting) => {
    const response = await axiosInstance.post('/waiting', waiting);
    return response.data;
  },

  deleteWaiting: async (waitingId: string) => {
    const response = await axiosInstance.delete(`/waiting/${waitingId}`);
    return response.data;
  },
};
