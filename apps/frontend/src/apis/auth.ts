import axiosInstance from '.';

export const authAPI = {
  login: async (code: string) => {
    const response = await axiosInstance.post('/auth/login', { code });
    return response.data;
  },
};
