import { Module } from '@nestjs/common';

import { OrderGateway } from './order.gateway';
import { AppWebSocketGateway } from './websocket.gateway';
import { WebSocketService } from './websocket.service';

@Module({
  providers: [AppWebSocketGateway, OrderGateway, WebSocketService],
  exports: [WebSocketService, OrderGateway],
})
export class WebSocketModule {}
