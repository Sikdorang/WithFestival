import { Controller, Get, Patch, Body, UseGuards } from '@nestjs/common';

import { CurrentUser } from '../auth/auth.decorator';
import { AuthGuard } from '../auth/auth.guard';

import { UserService } from './user.service';

interface UpdateAccountDto {
  account: string;
}

interface UpdateBoothNameDto {
  name: string;
}

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile')
  @UseGuards(AuthGuard)
  async getProfile(@CurrentUser() user: any) {
    try {
      const userProfile = await this.userService.getUserById(user.id);

      if (!userProfile) {
        return {
          success: false,
          message: '사용자 정보를 찾을 수 없습니다.',
        };
      }

      return {
        success: true,
        data: userProfile,
      };
    } catch (error) {
      return {
        success: false,
        message: '사용자 정보 조회에 실패했습니다.',
        error: error.message,
      };
    }
  }

  @Patch('account')
  @UseGuards(AuthGuard)
  async updateAccount(
    @Body() updateAccountDto: UpdateAccountDto,
    @CurrentUser() user: any,
  ) {
    try {
      const updatedUser = await this.userService.updateAccount(
        user.id,
        updateAccountDto,
      );

      return {
        success: true,
        message: '계좌번호가 수정되었습니다.',
        data: updatedUser,
      };
    } catch (error) {
      return {
        success: false,
        message: '계좌번호 수정에 실패했습니다.',
        error: error.message,
      };
    }
  }

  @Patch('name')
  @UseGuards(AuthGuard)
  async updateBoothName(
    @Body() updateBoothNameDto: UpdateBoothNameDto,
    @CurrentUser() user: any,
  ) {
    try {
      const updatedUser = await this.userService.updateBoothName(
        user.id,
        updateBoothNameDto,
      );

      return {
        success: true,
        message: '부스이름이 수정되었습니다.',
        data: updatedUser,
      };
    } catch (error) {
      return {
        success: false,
        message: '부스이름 수정에 실패했습니다.',
        error: error.message,
      };
    }
  }
}
