import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { MessageSenderGateway } from '../websocket/message/message-sender.gateway';

interface CreateMessageDto {
  userid: number;
  tableNumber: string;
  message: string;
}

@Injectable()
export class MessageService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly messageSenderGateway: MessageSenderGateway,
  ) {}

  async createMessage(createMessageDto: CreateMessageDto) {
    // 현재 시간을 시:분 형태로 가공
    const now = new Date();
    const time = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

    const message = await this.prisma.message.create({
      data: {
        ...createMessageDto,
        time: time,
      },
    });

    // WebSocket으로 메시지 생성 이벤트 발송
    try {
      await this.messageSenderGateway.emitMessageCreated(
        `user-${createMessageDto.userid}`,
        {
          messageId: message.id,
          message: message.message,
          tableNumber: message.tableNumber,
          time: message.time,
          check: message.check,
        },
      );
      console.log(
        `[MessageService] WebSocket message created event sent for message: ${message.id}`,
      );
    } catch (error) {
      console.error(
        `[MessageService] Failed to send WebSocket message created event:`,
        error,
      );
    }

    return message;
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
    const message = await this.prisma.message.update({
      where: {
        id: messageId,
      },
      data: {
        check: true,
      },
    });

    // WebSocket으로 메시지 체크 이벤트 발송
    try {
      await this.messageSenderGateway.emitMessageChecked(
        `user-${message.userid}`,
        {
          messageId: message.id,
          message: message.message,
          tableNumber: message.tableNumber,
          time: message.time,
          check: message.check,
        },
      );
      console.log(
        `[MessageService] WebSocket message checked event sent for message: ${message.id}`,
      );
    } catch (error) {
      console.error(
        `[MessageService] Failed to send WebSocket message checked event:`,
        error,
      );
    }

    return message;
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
