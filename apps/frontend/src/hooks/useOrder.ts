import { handelError } from '@/apis/errorhandler';
import { orderAPI } from '@/apis/order';
import { SUCCESS_MESSAGES } from '@/constants/message';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  const fetchOrder = async () => {
    setIsLoading(true);
    setLoginError(null);

    try {
      await orderAPI.getOrder();
      toast.success(SUCCESS_MESSAGES.loginSuccess);
      return true;
    } catch (error) {
      handelError(error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const createOrder = async (order: Order) => {
    setIsLoading(true);
    setLoginError(null);

    try {
      await orderAPI.createOrder(order);
      toast.success(SUCCESS_MESSAGES.loginSuccess);
      return true;
    } catch (error) {
      handelError(error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const updateOrder = async (order: Order) => {
    setIsLoading(true);
    setLoginError(null);
    try {
      await orderAPI.updateOrder(order);
      toast.success(SUCCESS_MESSAGES.loginSuccess);
      return true;
    } catch (error) {
      handelError(error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteOrder = async (orderId: string) => {
    setIsLoading(true);
    setLoginError(null);
    try {
      await orderAPI.deleteOrder(orderId);
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
    fetchOrder,
    createOrder,
    updateOrder,
    deleteOrder,
    isLoading,
    setIsLoading,
    loginError,
    setLoginError,
  };
};
