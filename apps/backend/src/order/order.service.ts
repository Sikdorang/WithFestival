import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

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
  constructor(private prisma: PrismaService) {}

  async createOrder(data: CreateOrderDto) {
    // 트랜잭션을 사용하여 주문과 주문 상세를 함께 생성
    return this.prisma.$transaction(async (prisma) => {
      // 1. 주문 생성
      const now = new Date();
      const timeString = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

      const order = await prisma.order.create({
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
          prisma.orderUser.create({
            data: {
              menu: item.menu,
              price: item.price,
              count: item.count,
              orderId: order.id,
            },
          }),
        ),
      );

      return {
        order,
        orderUsers,
      };
    });
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
        return {
          ...order,
          orderUsers,
        };
      }),
    );

    return ordersWithDetails;
  }

  async getOrderById(orderId: number, userId: number) {
    const order = await this.prisma.order.findFirst({
      where: {
        id: orderId,
        userid: userId,
      },
    });

    if (!order) {
      return null;
    }

    const orderUsers = await this.prisma.orderUser.findMany({
      where: { orderId: order.id },
    });

    return {
      ...order,
      orderUsers,
    };
  }
}
