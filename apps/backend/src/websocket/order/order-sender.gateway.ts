import { randomUUID } from 'crypto';

import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

import { ORDER_EVENT } from './order-event.constant';

@WebSocketGateway({
  cors: {
    origin: [
      'http://localhost:3000',
      'http://localhost:5173',
      'https://withfestival.site',
    ],
    credentials: true,
  },
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

      console.log(`[Socket] Order created event sent to room: ${roomName}`);
    } catch (error) {
      console.error(`[Socket] Failed to send order created event:`, error);
    }
  }

  async emitOrderSendUpdated(roomName: string, data: any): Promise<void> {
    const key = randomUUID();

    try {
      this.server
        .to(roomName)
        .emit(ORDER_EVENT.ORDER_SEND_UPDATED, { ...data, key });

      console.log(
        `[Socket] Order send updated event sent to room: ${roomName}`,
      );
    } catch (error) {
      console.error(`[Socket] Failed to send order send updated event:`, error);
    }
  }

  async emitOrderCookedUpdated(roomName: string, data: any): Promise<void> {
    const key = randomUUID();

    try {
      this.server
        .to(roomName)
        .emit(ORDER_EVENT.ORDER_COOKED_UPDATED, { ...data, key });

      console.log(
        `[Socket] Order cooked updated event sent to room: ${roomName}`,
      );
    } catch (error) {
      console.error(
        `[Socket] Failed to send order cooked updated event:`,
        error,
      );
    }
  }

  async emitOrderDeleted(roomName: string, data: any): Promise<void> {
    const key = randomUUID();

    try {
      this.server
        .to(roomName)
        .emit(ORDER_EVENT.ORDER_DELETED, { ...data, key });

      console.log(`[Socket] Order deleted event sent to room: ${roomName}`);
    } catch (error) {
      console.error(`[Socket] Failed to send order deleted event:`, error);
    }
  }
}
