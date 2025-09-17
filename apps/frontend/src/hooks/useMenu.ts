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

  const createMenu = async (menu: CreateMenuDto) => {
    setIsLoading(true);
    setLoginError(null);

    try {
      await menuAPI.createMenu(menu);
      return true;
    } catch (error) {
      handelError(error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const updateMenu = async (menu: Menu) => {
    setIsLoading(true);
    setLoginError(null);

    try {
      await menuAPI.updateMenu(menu);
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
      toast.success(SUCCESS_MESSAGES.loginSuccess);
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
      setMenus(response.data);
      console.log(response.data);
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
    updateMenu,
    deleteMenu,
    getMenuByUserId,
    isLoading,
    setIsLoading,
    loginError,
    setLoginError,
  };
};
