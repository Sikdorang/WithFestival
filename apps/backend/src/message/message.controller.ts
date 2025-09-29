import {
  Controller,
  Post,
  Get,
  Body,
  UseGuards,
  Patch,
  Param,
} from '@nestjs/common';

import { CurrentUser } from '../auth/auth.decorator';
import { AuthGuard } from '../auth/auth.guard';

import { MessageService } from './message.service';

interface CreateMessageDto {
  userId: number;
  tableNumber: string;
  message: string;
}

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post()
  async createMessage(@Body() createMessageDto: CreateMessageDto) {
    try {
      // body에서 받은 userId를 userid로 변환
      const messageData = {
        userid: createMessageDto.userId,
        tableNumber: createMessageDto.tableNumber,
        message: createMessageDto.message,
      };

      const result = await this.messageService.createMessage(messageData);

      return {
        success: true,
        message: '메시지가 생성되었습니다.',
        data: result,
      };
    } catch (error) {
      return {
        success: false,
        message: '메시지 생성에 실패했습니다.',
        error: error.message,
      };
    }
  }

  @Get()
  @UseGuards(AuthGuard)
  async getMessages(@CurrentUser() user: { id: number }) {
    try {
      const messages = await this.messageService.getMessages(user.id);

      return {
        success: true,
        data: messages,
      };
    } catch (error) {
      return {
        success: false,
        message: '메시지 조회에 실패했습니다.',
        error: error.message,
      };
    }
  }

  @Patch(':messageId/check')
  @UseGuards(AuthGuard)
  async updateMessageCheck(
    @Param('messageId') messageId: string,
    @CurrentUser() user: { id: number },
  ) {
    try {
      // messageId 유효성 검사
      const id = parseInt(messageId);
      if (isNaN(id)) {
        return {
          success: false,
          message: '유효하지 않은 메시지 ID입니다.',
        };
      }

      const result = await this.messageService.toggleMessageCheck(id);

      return {
        success: true,
        message: '메시지 체크 상태가 변경되었습니다.',
        data: result,
      };
    } catch (error) {
      console.error('updateMessageCheck error:', error);
      return {
        success: false,
        message: '메시지 체크 상태 변경에 실패했습니다.',
        error: error instanceof Error ? error.message : '알 수 없는 오류',
      };
    }
  }
}
