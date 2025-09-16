import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

interface CreateWaitingDto {
  name: string;
  people: number;
  phoneNumber: string;
  userId: number;
}

@Injectable()
export class WaitingService {
  constructor(private prisma: PrismaService) {}

  async createWaiting(data: CreateWaitingDto) {
    return this.prisma.waiting.create({
      data: {
        name: data.name,
        people: data.people,
        phoneNumber: data.phoneNumber,
        userid: data.userId,
        time: new Date(),
        processed: false,
      },
    });
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
    return this.prisma.waiting.update({
      where: { id: waitingId },
      data: { processed: true },
    });
  }
}
