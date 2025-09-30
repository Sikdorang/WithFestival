import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { OrderSenderGateway } from '../websocket/order/order-sender.gateway';

interface OrderItemDto {
  menu: string;
  price: number;
  count: number;
  totalprice: number;
}

interface CreateOrderDto {
  items: OrderItemDto[];
  name: string;
  tableNumber: string;
  totalPrice: number;
  userId: number;
}

@Injectable()
export class OrderService {
  constructor(
    private prisma: PrismaService,
    private readonly orderSenderGateway: OrderSenderGateway,
  ) {}

  async createOrder(data: CreateOrderDto) {
    // 1. 주문 생성
    const now = new Date();
    const timeString = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

    const order = await this.prisma.order.create({
      data: {
        time: timeString,
        send: false,
        cooked: false,
        totalPrice: data.totalPrice,
        name: data.name,
        tableNumber: data.tableNumber,
        userid: data.userId,
      },
    });

    // 2. 주문 상세 항목들 생성
    const orderUsers = await Promise.all(
      data.items.map((item) =>
        this.prisma.orderUser.create({
          data: {
            menu: item.menu,
            price: item.price,
            count: item.count,
            orderId: order.id,
          },
        }),
      ),
    );

    const result = {
      order,
      orderUsers,
    };

    // WebSocket으로 주문 생성 이벤트 발송
    try {
      await this.orderSenderGateway.emitOrderCreated(`user-${data.userId}`, {
        orderId: result.order.id,
        tableNumber: data.tableNumber,
        totalPrice: data.totalPrice,
        name: data.name,
        time: result.order.time,
        items: data.items,
      });
      console.log(
        `[OrderService] WebSocket event sent for order: ${result.order.id}`,
      );
    } catch (error) {
      console.error(`[OrderService] Failed to send WebSocket event:`, error);
      // WebSocket 실패해도 주문은 정상 처리됨
    }

    return result;
  }

  async getOrdersByUserId(userId: number) {
    const orders = await this.prisma.order.findMany({
      where: {
        userid: userId,
      },
      orderBy: {
        time: 'desc',
      },
    });

    // 각 주문에 대한 상세 항목들 조회
    const ordersWithDetails = await Promise.all(
      orders.map(async (order) => {
        const orderUsers = await this.prisma.orderUser.findMany({
          where: { orderId: order.id },
        });

        // 각 주문 항목에 대해 메뉴 정보(마진 포함) 조회
        const orderUsersWithMenuInfo = await Promise.all(
          orderUsers.map(async (orderUser) => {
            const menuInfo = await this.prisma.menu.findFirst({
              where: { menu: orderUser.menu },
            });
            return {
              ...orderUser,
              margin: menuInfo?.margin || 0,
            };
          }),
        );

        return {
          ...order,
          orderUsers: orderUsersWithMenuInfo,
        };
      }),
    );

    return ordersWithDetails;
  }

  async getOrderById(orderId: number, userId: number) {
    const order = await this.prisma.order.findUnique({
      where: {
        id: orderId,
      },
    });

    if (!order || order.userid !== userId) {
      return null;
    }

    const orderUsers = await this.prisma.orderUser.findMany({
      where: { orderId: order.id },
    });

    return {
      ...order,
      orderUsers,
    };
    return null;
  }

  async getOrdersBySendStatus(
    userId: number,
    sendStatus: boolean,
    cookedStatus: boolean,
  ) {
    const orders = await this.prisma.order.findMany({
      where: {
        userid: userId,
        send: sendStatus,
        cooked: cookedStatus,
      },
      orderBy: {
        time: 'desc',
      },
    });

    // 각 주문에 대한 상세 항목들 조회
    const ordersWithDetails = await Promise.all(
      orders.map(async (order) => {
        const orderUsers = await this.prisma.orderUser.findMany({
          where: { orderId: order.id },
        });
        return {
          ...order,
          orderUsers,
        };
      }),
    );
    return ordersWithDetails;
  }

  async updateOrderSend(orderId: number, userId: number) {
    // 해당 주문이 현재 사용자의 것인지 확인
    const order = await this.prisma.order.findFirst({
      where: {
        id: orderId,
        userid: userId,
      },
    });

    if (!order) {
      throw new Error('주문을 찾을 수 없거나 권한이 없습니다.');
    }

    const updatedOrder = await this.prisma.order.update({
      where: { id: orderId },
      data: { send: true },
    });

    // WebSocket으로 송금 상태 변경 이벤트 발송
    try {
      await this.orderSenderGateway.emitOrderSendUpdated(`user-${userId}`, {
        orderId: updatedOrder.id,
        send: updatedOrder.send,
        time: updatedOrder.time,
        name: updatedOrder.name,
        tableNumber: updatedOrder.tableNumber,
      });
      console.log(
        `[OrderService] WebSocket send updated event sent for order: ${updatedOrder.id}`,
      );
    } catch (error) {
      console.error(
        `[OrderService] Failed to send WebSocket send updated event:`,
        error,
      );
    }

    return updatedOrder;
  }

  async updateOrderCooked(orderId: number, userId: number) {
    // 해당 주문이 현재 사용자의 것인지 확인
    const order = await this.prisma.order.findFirst({
      where: {
        id: orderId,
        userid: userId,
      },
    });

    if (!order) {
      throw new Error('주문을 찾을 수 없거나 권한이 없습니다.');
    }

    const updatedOrder = await this.prisma.order.update({
      where: { id: orderId },
      data: { cooked: true },
    });

    // WebSocket으로 조리 상태 변경 이벤트 발송
    try {
      await this.orderSenderGateway.emitOrderCookedUpdated(`user-${userId}`, {
        orderId: updatedOrder.id,
        cooked: updatedOrder.cooked,
        time: updatedOrder.time,
        name: updatedOrder.name,
        tableNumber: updatedOrder.tableNumber,
      });
      console.log(
        `[OrderService] WebSocket cooked updated event sent for order: ${updatedOrder.id}`,
      );
    } catch (error) {
      console.error(
        `[OrderService] Failed to send WebSocket cooked updated event:`,
        error,
      );
    }

    return updatedOrder;
  }

  async getUserInfo(userId: number) {
    return this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        name: true,
        account: true,
        notice: true,
        event: true,
      },
    });
  }

  async deleteOrder(orderId: number, userId: number) {
    // 해당 주문이 현재 사용자의 것인지 확인
    const order = await this.prisma.order.findFirst({
      where: {
        id: orderId,
        userid: userId,
      },
    });

    if (!order) {
      throw new Error('주문을 찾을 수 없거나 권한이 없습니다.');
    }

    // 트랜잭션을 사용하여 주문과 관련된 모든 데이터 삭제
    const result = await this.prisma.$transaction(async (prisma) => {
      // 1. order_users 테이블에서 해당 orderId와 관련된 모든 레코드 삭제
      await prisma.orderUser.deleteMany({
        where: { orderId: orderId },
      });

      // 2. order 테이블에서 해당 주문 삭제
      const deletedOrder = await prisma.order.delete({
        where: { id: orderId },
      });

      return {
        deletedOrder,
        message: '주문과 관련된 모든 데이터가 삭제되었습니다.',
      };
    });

    // WebSocket으로 주문 삭제 이벤트 발송
    try {
      await this.orderSenderGateway.emitOrderDeleted(`user-${userId}`, {
        orderId: result.deletedOrder.id,
        time: result.deletedOrder.time,
        name: result.deletedOrder.name,
        tableNumber: result.deletedOrder.tableNumber,
        totalPrice: result.deletedOrder.totalPrice,
      });
      console.log(
        `[OrderService] WebSocket deleted event sent for order: ${result.deletedOrder.id}`,
      );
    } catch (error) {
      console.error(
        `[OrderService] Failed to send WebSocket deleted event:`,
        error,
      );
    }

    return result;
  }
}
