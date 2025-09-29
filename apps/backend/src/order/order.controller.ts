import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  UseGuards,
  Patch,
  Delete,
} from '@nestjs/common';

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
        false,
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

  @Get('user/:userId/info')
  async getUserInfo(@Param('userId') userId: string) {
    try {
      const userInfo = await this.orderService.getUserInfo(parseInt(userId));

      if (!userInfo) {
        return {
          success: false,
          message: '사용자 정보를 찾을 수 없습니다.',
        };
      }

      return {
        success: true,
        data: {
          name: userInfo.name,
          account: userInfo.account,
          notice: userInfo.notice,
          event: userInfo.event,
        },
      };
    } catch (error) {
      return {
        success: false,
        message: '사용자 정보 조회에 실패했습니다.',
        error: error.message,
      };
    }
  }

  @Patch(':orderId/send')
  @UseGuards(AuthGuard)
  async updateOrderSend(
    @Param('orderId') orderId: string,
    @CurrentUser() user: any,
  ) {
    try {
      const updatedOrder = await this.orderService.updateOrderSend(
        parseInt(orderId),
        user.id,
      );

      return {
        success: true,
        message: '송금 상태가 변경되었습니다.',
        data: updatedOrder,
      };
    } catch (error) {
      return {
        success: false,
        message: '송금 상태 변경에 실패했습니다.',
        error: error.message,
      };
    }
  }

  @Patch(':orderId/cooked')
  @UseGuards(AuthGuard)
  async updateOrderCooked(
    @Param('orderId') orderId: string,
    @CurrentUser() user: any,
  ) {
    try {
      const updatedOrder = await this.orderService.updateOrderCooked(
        parseInt(orderId),
        user.id,
      );

      return {
        success: true,
        message: '조리 상태가 변경되었습니다.',
        data: updatedOrder,
      };
    } catch (error) {
      return {
        success: false,
        message: '조리 상태 변경에 실패했습니다.',
        error: error.message,
      };
    }
  }

  @Delete(':orderId')
  @UseGuards(AuthGuard)
  async deleteOrder(
    @Param('orderId') orderId: string,
    @CurrentUser() user: any,
  ) {
    try {
      const result = await this.orderService.deleteOrder(
        parseInt(orderId),
        user.id,
      );

      return {
        success: true,
        message: '주문이 삭제되었습니다.',
        data: result,
      };
    } catch (error) {
      return {
        success: false,
        message: '주문 삭제에 실패했습니다.',
        error: error.message,
      };
    }
  }
}
