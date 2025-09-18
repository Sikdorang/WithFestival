import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  ConnectedSocket,
  MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*', // 필요에 따라 허용
  },
  namespace: '/',
})
export class OrderGateway implements OnGatewayConnection {
  @WebSocketServer() server: Server;

  handleConnection(client: Socket) {
    console.log('클라이언트 연결:', client.id);
  }

  // 공통: 특정 방 입장
  @SubscribeMessage('joinRoom')
  handleJoinRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { roomId: string },
  ) {
    const { roomId } = data;
    client.join(roomId);
    console.log(`${client.id}가 방 ${roomId} 입장`);
    client.emit('joinedRoom', { roomId });
  }

  // 손님 → 서버: 주문 이벤트 발송
  @SubscribeMessage('order')
  handleOrder(
    @ConnectedSocket() client: Socket,
    @MessageBody()
    data: {
      roomId: string; // storeId 또는 sessionId
      orderData: any;
    },
  ) {
    console.log('주문 이벤트:', data);
    // 해당 방의 관리자(또는 모든 클라이언트)에게 전달
    this.server.to(data.roomId).emit('orderReceived', data.orderData);
    // 해당 방의 모든 클라이언트에게 화면 새로고침 이벤트 발송
    this.server.to(data.roomId).emit('refreshScreen');
  }

  // 대기 관련 이벤트들
  @SubscribeMessage('waitingCreated')
  handleWaitingCreated(
    @ConnectedSocket() client: Socket,
    @MessageBody()
    data: {
      roomId: string;
      waitingData: any;
    },
  ) {
    console.log('대기 생성 이벤트:', data);
    // 해당 방의 모든 클라이언트에게 대기 정보 전달
    this.server.to(data.roomId).emit('waitingReceived', data.waitingData);
    // 화면 새로고침 이벤트 발송
    this.server.to(data.roomId).emit('refreshScreen');
  }

  @SubscribeMessage('waitingProcessed')
  handleWaitingProcessed(
    @ConnectedSocket() client: Socket,
    @MessageBody()
    data: {
      roomId: string;
      waitingId: number;
    },
  ) {
    console.log('대기 처리 이벤트:', data);
    // 해당 방의 모든 클라이언트에게 대기 처리 알림
    this.server
      .to(data.roomId)
      .emit('waitingProcessed', { waitingId: data.waitingId });
    // 화면 새로고침 이벤트 발송
    this.server.to(data.roomId).emit('refreshScreen');
  }
}
