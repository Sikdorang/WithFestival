import { randomUUID } from 'crypto';

import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

import { MESSAGE_EVENT } from './message-event.constant';

@WebSocketGateway({
  cors: true,
  namespace: '/ws',
})
export class MessageSenderGateway {
  @WebSocketServer()
  server: Server;

  async emitMessageCreated(roomName: string, data: any): Promise<void> {
    const key = randomUUID();

    try {
      this.server
        .to(roomName)
        .emit(MESSAGE_EVENT.MESSAGE_CREATED, { ...data, key });

      console.log(`[Socket] Message created event sent to room: ${roomName}`);
    } catch (error) {
      console.error(`[Socket] Failed to send message created event:`, error);
    }
  }

  async emitMessageChecked(roomName: string, data: any): Promise<void> {
    const key = randomUUID();

    try {
      this.server
        .to(roomName)
        .emit(MESSAGE_EVENT.MESSAGE_CHECKED, { ...data, key });

      console.log(`[Socket] Message checked event sent to room: ${roomName}`);
    } catch (error) {
      console.error(`[Socket] Failed to send message checked event:`, error);
    }
  }
}
