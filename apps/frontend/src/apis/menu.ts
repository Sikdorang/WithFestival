import axiosInstance from '.';
import { CreateMenuDto } from '../types/payload/menu';

export const menuAPI = {
  getMenu: async () => {
    const response = await axiosInstance.get('/menu');
    return response.data;
  },

  createMenu: async (menu: CreateMenuDto) => {
    const response = await axiosInstance.post('/menu', menu);
    return response.data;
  },

  updateMenu: async (menu: Menu) => {
    const response = await axiosInstance.patch('/menu', menu);
    return response.data;
  },

  deleteMenu: async (menuId: string) => {
    const response = await axiosInstance.delete(`/menu/${menuId}`);
    return response.data;
  },
};
