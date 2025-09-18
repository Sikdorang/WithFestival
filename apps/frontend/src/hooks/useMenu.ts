import { handelError } from '@/apis/errorhandler';
import { menuAPI } from '@/apis/menu';
import { Menu } from '@/types/global';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { SUCCESS_MESSAGES } from '../constants/message';
import { ROUTES } from '../constants/routes';
import { CreateMenuDto } from '../types/payload/menu';

export const useMenu = () => {
  const navigate = useNavigate();
  const [menus, setMenus] = useState<Menu[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  const fetchMenu = async () => {
    setIsLoading(true);
    setLoginError(null);

    try {
      const response = await menuAPI.getMenu();
      console.log(response.data);
      setMenus(response.data);
      return true;
    } catch (error) {
      handelError(error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const createMenu = async (menu: CreateMenuDto): Promise<Menu | null> => {
    setIsLoading(true);
    setLoginError(null);

    try {
      const response = await menuAPI.createMenu(menu);
      toast.success(SUCCESS_MESSAGES.createMenuSuccess);
      return response.data;
    } catch (error) {
      handelError(error);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const uploadMenuImage = async (menuId: number, imageFile: File) => {
    setIsLoading(true);
    setLoginError(null);

    try {
      await menuAPI.uploadMenuImage(menuId, imageFile);

      return true;
    } catch (error) {
      handelError(error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteMenuImage = async (menuId: number) => {
    try {
      await menuAPI.deleteMenuImage(menuId);
      toast.success(SUCCESS_MESSAGES.deleteMenuImageSuccess);
      return true;
    } catch (error) {
      handelError(error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const updateMenu = async (menuId: number, menu: CreateMenuDto) => {
    setIsLoading(true);
    setLoginError(null);

    try {
      await menuAPI.updateMenu(menuId, menu);
      toast.success(SUCCESS_MESSAGES.updateMenuSuccess);

      return true;
    } catch (error) {
      handelError(error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteMenu = async (menuId: number) => {
    setIsLoading(true);
    setLoginError(null);

    try {
      await menuAPI.deleteMenu(menuId);

      navigate(ROUTES.STORE);
      toast.success(SUCCESS_MESSAGES.deleteMenuSuccess);
      return true;
    } catch (error) {
      handelError(error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const getMenuByUserId = async (userId: number) => {
    setIsLoading(true);
    setLoginError(null);

    try {
      const response = await menuAPI.getMenuByUserId(userId);
      console.log(response.data);
      setMenus(response.data);

      return true;
    } catch (error) {
      handelError(error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    menus,
    fetchMenu,
    createMenu,
    uploadMenuImage,
    deleteMenuImage,
    updateMenu,
    deleteMenu,
    getMenuByUserId,
    isLoading,
    setIsLoading,
    loginError,
    setLoginError,
  };
};
