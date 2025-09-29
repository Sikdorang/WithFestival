import { randomUUID } from 'crypto';

import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

import { WAITING_EVENT } from './waiting-event.constant';

@WebSocketGateway({
  cors: true,
  namespace: '/ws',
})
export class WaitingSenderGateway {
  @WebSocketServer()
  server: Server;

  async emitWaitingCreated(roomName: string, data: any): Promise<void> {
    const key = randomUUID();

    try {
      this.server
        .to(roomName)
        .emit(WAITING_EVENT.WAITING_CREATED, { ...data, key });

      console.log(`[Socket] Waiting created event sent to room: ${roomName}`);
    } catch (error) {
      console.error(`[Socket] Failed to send waiting created event:`, error);
    }
  }

  async emitWaitingProcessed(roomName: string, data: any): Promise<void> {
    const key = randomUUID();

    try {
      this.server
        .to(roomName)
        .emit(WAITING_EVENT.WAITING_PROCESSED, { ...data, key });

      console.log(`[Socket] Waiting processed event sent to room: ${roomName}`);
    } catch (error) {
      console.error(`[Socket] Failed to send waiting processed event:`, error);
    }
  }
}
