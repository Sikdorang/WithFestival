import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';

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
export class OrderReceiverGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  handleConnection(socket: Socket) {
    const room = socket.handshake.query.room as string;
    if (room) {
      socket.join(room);
      console.log(
        `[Socket] Client connected: ${socket.id}, joined room: ${room}`,
      );
    } else {
      console.warn(`[Socket] Client connected without room: ${socket.id}`);
    }
  }

  handleDisconnect(socket: Socket) {
    console.log(`[Socket] Client disconnected: ${socket.id}`);
  }
}
