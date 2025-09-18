import { Injectable, Inject, forwardRef } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { OrderGateway } from '../websocket/order.gateway';

interface CreateWaitingDto {
  name: string;
  people: number;
  phoneNumber: string;
  userId: number;
}

@Injectable()
export class WaitingService {
  constructor(
    private prisma: PrismaService,
    @Inject(forwardRef(() => OrderGateway))
    private orderGateway: OrderGateway,
  ) {}

  async createWaiting(data: CreateWaitingDto) {
    const waiting = await this.prisma.waiting.create({
      data: {
        name: data.name,
        people: data.people,
        phoneNumber: data.phoneNumber,
        userid: data.userId,
        time: new Date(),
        processed: false,
      },
    });

    // WebSocket 이벤트 발송
    if (this.orderGateway) {
      this.orderGateway.server.emit('waitingCreated', {
        roomId: `user_${data.userId}`,
        waitingData: waiting,
      });
      this.orderGateway.server.emit('refreshScreen');
    }

    return waiting;
  }

  async getUserWaitingInfo(userId: number) {
    // 사용자 정보 조회
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { name: true },
    });

    if (!user) {
      return null;
    }

    // 처리되지 않은 대기 수 조회
    const waitingCount = await this.prisma.waiting.count({
      where: {
        userid: userId,
        processed: false,
      },
    });

    return {
      name: user.name,
      waitingCount,
    };
  }

  async processWaiting(waitingId: number, userId: number) {
    // 해당 대기가 해당 사용자의 것인지 확인
    const waiting = await this.prisma.waiting.findFirst({
      where: {
        id: waitingId,
        userid: userId,
        processed: false,
      },
    });

    if (!waiting) {
      return null;
    }

    // processed를 true로 업데이트
    const updatedWaiting = await this.prisma.waiting.update({
      where: { id: waitingId },
      data: { processed: true },
    });

    // WebSocket 이벤트 발송
    if (this.orderGateway) {
      this.orderGateway.server.emit('waitingProcessed', {
        roomId: `user_${userId}`,
        waitingId: waitingId,
      });
      this.orderGateway.server.emit('refreshScreen');
    }

    return updatedWaiting;
  }

  async getUnprocessedWaitings(userId: number) {
    const waitings = await this.prisma.waiting.findMany({
      where: {
        userid: userId,
        processed: false,
      },
      orderBy: {
        time: 'asc', // 등록 시간 순으로 정렬
      },
    });

    // time 값을 시간:분 형식으로 가공
    return waitings.map((waiting) => ({
      ...waiting,
      time: `${waiting.time.getHours().toString().padStart(2, '0')}:${waiting.time.getMinutes().toString().padStart(2, '0')}`,
    }));
  }
}
