import { handelError } from '@/apis/errorhandler';
import { waitingAPI } from '@/apis/waiting';
import { SUCCESS_MESSAGES } from '@/constants/message';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  const fetchWaiting = async () => {
    setIsLoading(true);
    setLoginError(null);

    try {
      await waitingAPI.getWaiting();
      toast.success(SUCCESS_MESSAGES.loginSuccess);
      return true;
    } catch (error) {
      handelError(error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const createWaiting = async (waiting: Waiting) => {
    setIsLoading(true);
    setLoginError(null);

    try {
      await waitingAPI.createWaiting(waiting);
      toast.success(SUCCESS_MESSAGES.loginSuccess);
      return true;
    } catch (error) {
      handelError(error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const updateWaiting = async (waiting: Waiting) => {
    setIsLoading(true);
    setLoginError(null);

    try {
      await waitingAPI.updateWaiting(waiting);
      toast.success(SUCCESS_MESSAGES.loginSuccess);
      return true;
    } catch (error) {
      handelError(error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteWaiting = async (waitingId: string) => {
    setIsLoading(true);
    setLoginError(null);

    try {
      await waitingAPI.deleteWaiting(waitingId);
      toast.success(SUCCESS_MESSAGES.loginSuccess);
      return true;
    } catch (error) {
      handelError(error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    fetchWaiting,
    createWaiting,
    updateWaiting,
    deleteWaiting,
    isLoading,
    setIsLoading,
    loginError,
    setLoginError,
  };
};
