import { handelError } from '@/apis/errorhandler';
import { storeAPI } from '@/apis/store';
import { SUCCESS_MESSAGES } from '@/constants/message';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

export const useStore = () => {
  const [name, setName] = useState<string>('');
  const [account, setAccount] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  const getStoreInfo = async () => {
    setIsLoading(true);
    setLoginError(null);

    try {
      const response = await storeAPI.getStoreInfo();
      setName(response.data.name);
      setAccount(response.data.account);
    } catch (error) {
      handelError(error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const updateStoreAccount = async (account: string) => {
    setIsLoading(true);
    setLoginError(null);

    try {
      await storeAPI.updateStoreInfo(account);
      setAccount(account);
      toast.success(SUCCESS_MESSAGES.storeAccountUpdateSuccess);
      return true;
    } catch (error) {
      handelError(error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const updateStoreName = async (name: string) => {
    setIsLoading(true);
    setLoginError(null);

    try {
      await storeAPI.updateStoreName(name);
      setName(name);
      toast.success(SUCCESS_MESSAGES.storeNameUpdateSuccess);
      return true;
    } catch (error) {
      handelError(error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    name,
    account,
    getStoreInfo,
    updateStoreAccount,
    updateStoreName,
    isLoading,
    loginError,
  };
};
