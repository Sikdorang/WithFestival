import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';

import { CurrentUser } from '../auth/auth.decorator';
import { AuthGuard } from '../auth/auth.guard';

import { WaitingService } from './waiting.service';

interface CreateWaitingDto {
  name: string;
  people: number;
  phoneNumber: string;
  userId: number;
}

@Controller('waiting')
export class WaitingController {
  constructor(private readonly waitingService: WaitingService) {}

  @Post()
  async createWaiting(@Body() createWaitingDto: CreateWaitingDto) {
    try {
      const waiting = await this.waitingService.createWaiting(createWaitingDto);
      return {
        success: true,
        message: '대기 등록이 완료되었습니다.',
        data: waiting,
      };
    } catch (error) {
      return {
        success: false,
        message: '대기 등록에 실패했습니다.',
        error: error.message,
      };
    }
  }

  @Get('user/:userId')
  async getUserWaitingInfo(@Param('userId') userId: string) {
    try {
      const userInfo = await this.waitingService.getUserWaitingInfo(
        parseInt(userId),
      );

      if (!userInfo) {
        return {
          success: false,
          message: '사용자를 찾을 수 없습니다.',
        };
      }

      return {
        success: true,
        data: userInfo,
      };
    } catch (error) {
      return {
        success: false,
        message: '사용자 대기 정보 조회에 실패했습니다.',
        error: error.message,
      };
    }
  }

  @Patch(':waitingId/process')
  @UseGuards(AuthGuard)
  async processWaiting(
    @Param('waitingId') waitingId: string,
    @CurrentUser() user: any,
  ) {
    try {
      const waiting = await this.waitingService.processWaiting(
        parseInt(waitingId),
        user.id,
      );

      if (!waiting) {
        return {
          success: false,
          message: '대기를 찾을 수 없거나 이미 처리되었습니다.',
        };
      }

      return {
        success: true,
        message: '대기가 처리되었습니다.',
        data: waiting,
      };
    } catch (error) {
      return {
        success: false,
        message: '대기 처리에 실패했습니다.',
        error: error.message,
      };
    }
  }

  @Get('unprocessed')
  @UseGuards(AuthGuard)
  async getUnprocessedWaitings(@CurrentUser() user: any) {
    try {
      const waitings = await this.waitingService.getUnprocessedWaitings(
        user.id,
      );

      return {
        success: true,
        data: waitings,
        count: waitings.length,
      };
    } catch (error) {
      return {
        success: false,
        message: '대기 목록 조회에 실패했습니다.',
        error: error.message,
      };
    }
  }
}
