import { Controller, Post, Body, Get, Param, UseGuards } from '@nestjs/common';

import { CurrentUser } from '../auth/auth.decorator';
import { AuthGuard } from '../auth/auth.guard';

import { OrderService } from './order.service';

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
}

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @UseGuards(AuthGuard)
  async createOrder(
    @Body() createOrderDto: CreateOrderDto,
    @CurrentUser() user: any,
  ) {
    try {
      const orderData = {
        ...createOrderDto,
        userId: user.id,
      };

      const result = await this.orderService.createOrder(orderData);

      return {
        success: true,
        message: '주문이 완료되었습니다.',
        data: result,
      };
    } catch (error) {
      return {
        success: false,
        message: '주문 생성에 실패했습니다.',
        error: error.message,
      };
    }
  }

  @Get()
  @UseGuards(AuthGuard)
  async getOrders(@CurrentUser() user: any) {
    try {
      const orders = await this.orderService.getOrdersByUserId(user.id);

      return {
        success: true,
        data: orders,
        count: orders.length,
      };
    } catch (error) {
      return {
        success: false,
        message: '주문 목록 조회에 실패했습니다.',
        error: error.message,
      };
    }
  }

  @Get(':orderId')
  @UseGuards(AuthGuard)
  async getOrder(@Param('orderId') orderId: string, @CurrentUser() user: any) {
    try {
      const order = await this.orderService.getOrderById(
        parseInt(orderId),
        user.id,
      );

      if (!order) {
        return {
          success: false,
          message: '주문을 찾을 수 없습니다.',
        };
      }

      return {
        success: true,
        data: order,
      };
    } catch (error) {
      return {
        success: false,
        message: '주문 조회에 실패했습니다.',
        error: error.message,
      };
    }
  }
}
