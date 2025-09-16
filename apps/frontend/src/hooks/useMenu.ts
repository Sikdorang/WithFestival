import { handelError } from '@/apis/errorhandler';
import { menuAPI } from '@/apis/menu';
import { Menu } from '@/types/global';
import { useState } from 'react';
import { CreateMenuDto } from '../types/payload/menu';

export const useMenu = () => {
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

  const deleteMenu = async (menuId: string) => {
    setIsLoading(true);
    setLoginError(null);

    try {
      await menuAPI.deleteMenu(menuId);
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
    isLoading,
    setIsLoading,
    loginError,
    setLoginError,
  };
};
