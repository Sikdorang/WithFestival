import { Module } from '@nestjs/common';

import { OrderReceiverGateway } from '../websocket/order-receiver.gateway';
import { OrderSenderGateway } from '../websocket/order-sender.gateway';

import { OrderController } from './order.controller';
import { OrderService } from './order.service';

@Module({
  providers: [OrderService, OrderSenderGateway, OrderReceiverGateway],
  controllers: [OrderController],
  exports: [OrderService],
})
export class OrderModule {}
