import { Module } from '@nestjs/common';

import { WebSocketModule } from '../websocket/websocket.module';

import { OrderController } from './order.controller';
import { OrderService } from './order.service';

@Module({
  imports: [WebSocketModule],
  providers: [OrderService],
  controllers: [OrderController],
  exports: [OrderService],
})
export class OrderModule {}
