import { handelError } from '@/apis/errorhandler';
import { orderAPI } from '@/apis/order';
import { SUCCESS_MESSAGES } from '@/constants/message';
import { ROUTES } from '@/constants/routes';
import { useOrderStore } from '@/stores/orderStore';
import { OrderListApiResponse } from '@/types/global';
import { useCallback, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export const useOrder = () => {
  const [pendingOrders, setPendingOrders] = useState<OrderListApiResponse>();
  const [sentOrders, setSentOrders] = useState<OrderListApiResponse>();
  const [isLoading, setIsLoading] = useState(false);
  const [orderError, setOrderError] = useState<string | null>(null);

  const navigate = useNavigate();
  const { orderItems, depositorName, clearOrder } = useOrderStore();

  const userData = JSON.parse(sessionStorage.getItem('userData') || '{}');

  const createOrder = async () => {
    setIsLoading(true);
    setOrderError(null);

    if (orderItems.length === 0) {
      toast.error('주문할 메뉴가 없습니다.');
      setIsLoading(false);
      return;
    }

    try {
      const itemsForApi = orderItems.map((item) => ({
        menu: item.name,
        price: item.price,
        count: item.quantity,
        totalprice: item.price * item.quantity,
      }));

      const totalOrderPrice = itemsForApi.reduce(
        (sum, item) => sum + item.totalprice,
        0,
      );

      const payload = {
        items: itemsForApi,
        name: depositorName,
        tableNumber: String(userData.tableId),
        totalPrice: totalOrderPrice,
        userId: userData.userId,
      };

      await orderAPI.createOrder(payload);

      toast.success('주문이 성공적으로 완료되었습니다!');
      clearOrder();
      navigate(ROUTES.MENU_BOARD);
      return true;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || '주문 중 오류가 발생했습니다.';
      setOrderError(errorMessage);
      toast.error(errorMessage);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getPendingOrders = useCallback(async () => {
    try {
      const response = await orderAPI.getPendingOrders();
      setPendingOrders(response);
      console.log('set');
    } catch (error) {
      handelError(error);
    }
  }, []);

  const getSentOrders = useCallback(async () => {
    try {
      const response = await orderAPI.getSentOrders();
      setSentOrders(response);
    } catch (error) {
      handelError(error);
    }
  }, []);

  const setOrderSent = async (orderId: number) => {
    try {
      await orderAPI.setOrderSent(orderId);
      await Promise.all([getPendingOrders()]);
      toast.success(SUCCESS_MESSAGES.orderConfirmSuccess);
    } catch (error) {
      handelError(error);
    }
  };

  const setOrderCooked = async (orderId: number) => {
    try {
      await orderAPI.setOrderCooked(orderId);
      await Promise.all([getSentOrders(), getPendingOrders()]);
      toast.success(SUCCESS_MESSAGES.orderCookingComplete);
    } catch (error) {
      handelError(error);
    }
  };

  return {
    pendingOrders,
    sentOrders,
    createOrder,
    getPendingOrders,
    getSentOrders,
    setOrderSent,
    setOrderCooked,
    isLoading,
    error: orderError,
  };
};
