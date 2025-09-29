import { randomUUID } from 'crypto';

import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

import { ORDER_EVENT } from './order-event.constant';

@WebSocketGateway({
  cors: true,
  namespace: '/ws',
})
export class OrderSenderGateway {
  @WebSocketServer()
  server: Server;

  async emitOrderCreated(roomName: string, data: any): Promise<void> {
    const key = randomUUID();

    try {
      this.server
        .to(roomName)
        .emit(ORDER_EVENT.ORDER_CREATED, { ...data, key });

      console.log(`[Socket] Order event sent to room: ${roomName}`);
    } catch (error) {
      console.error(`[Socket] Failed to send order event:`, error);
    }
  }
}
