import axiosInstance from '.';
import { CreateMenuDto } from '../types/payload/menu';

export const menuAPI = {
  getMenu: async () => {
    const response = await axiosInstance.get('/menu/menus');
    return response.data;
  },

  getMenuByUserId: async (userId: number) => {
    const response = await axiosInstance.get(`/menu/user/${userId}`);
    return response.data;
  },

  createMenu: async (menu: CreateMenuDto) => {
    const response = await axiosInstance.post('/menu', menu);
    return response.data;
  },

  uploadMenuImage: async (menuId: number, imageFile: File) => {
    const formData = new FormData();
    formData.append('image', imageFile);
    const response = await axiosInstance.post(
      `/menu/${menuId}/image`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    return response.data;
  },

  deleteMenuImage: async (menuId: number) => {
    const response = await axiosInstance.delete(`/menu/${menuId}/image`);
    return response.data;
  },

  updateMenu: async (menuId: number, menu: CreateMenuDto) => {
    const response = await axiosInstance.patch(`/menu/${menuId}`, menu);
    return response.data;
  },

  deleteMenu: async (menuId: number) => {
    const response = await axiosInstance.delete(`/menu/${menuId}`);
    return response.data;
  },
};
