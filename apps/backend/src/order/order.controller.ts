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
  userId: number;
}

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async createOrder(@Body() createOrderDto: CreateOrderDto) {
    try {
      const result = await this.orderService.createOrder(createOrderDto);

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

  @Get('pending')
  @UseGuards(AuthGuard)
  async getPendingOrders(@CurrentUser() user: any) {
    try {
      const orders = await this.orderService.getOrdersBySendStatus(
        user.id,
        false,
      );
      return {
        success: true,
        message: '미송금 주문 목록을 조회했습니다.',
        data: orders,
        count: orders.length,
      };
    } catch (error) {
      return {
        success: false,
        message: '미송금 주문 목록 조회에 실패했습니다.',
        error: error.message,
      };
    }
  }

  @Get('sent')
  @UseGuards(AuthGuard)
  async getSentOrders(@CurrentUser() user: any) {
    try {
      const orders = await this.orderService.getOrdersBySendStatus(
        user.id,
        true,
      );

      return {
        success: true,
        message: '송금완료 주문 목록을 조회했습니다.',
        data: orders,
        count: orders.length,
      };
    } catch (error) {
      return {
        success: false,
        message: '송금완료 주문 목록 조회에 실패했습니다.',
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
