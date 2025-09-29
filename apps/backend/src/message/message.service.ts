import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

interface CreateMessageDto {
  userid: number;
  tableNumber: string;
  message: string;
}

@Injectable()
export class MessageService {
  constructor(private readonly prisma: PrismaService) {}

  async createMessage(createMessageDto: CreateMessageDto) {
    // 현재 시간을 시:분 형태로 가공
    const now = new Date();
    const time = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

    return this.prisma.message.create({
      data: {
        ...createMessageDto,
        time: time,
      },
    });
  }

  async getMessages(userId: number) {
    return this.prisma.message.findMany({
      where: {
        userid: userId,
      },
      orderBy: {
        id: 'desc',
      },
    });
  }

  async updateMessageCheck(messageId: number) {
    return this.prisma.message.update({
      where: {
        id: messageId,
      },
      data: {
        check: true,
      },
    });
  }

  async toggleMessageCheck(messageId: number) {
    try {
      // 현재 메시지의 check 상태를 가져옴
      const message = await this.prisma.message.findUnique({
        where: {
          id: messageId,
        },
        select: {
          check: true,
        },
      });

      if (!message) {
        throw new Error('메시지를 찾을 수 없습니다.');
      }

      // 현재 상태의 반대로 변경
      return this.prisma.message.update({
        where: {
          id: messageId,
        },
        data: {
          check: !message.check,
        },
      });
    } catch (error) {
      console.error('toggleMessageCheck error:', error);
      throw new Error(`메시지 체크 상태 변경 실패: ${error.message}`);
    }
  }
}
