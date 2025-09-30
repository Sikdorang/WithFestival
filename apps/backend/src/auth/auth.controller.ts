import { Controller, Post, Body, Session, Get } from '@nestjs/common';

import { AuthService } from './auth.service';

interface LoginDto {
  code: string;
}

interface SessionData {
  userId?: number;
  userCode?: string;
  userName?: string;
  userAccount?: string;
  isAuthenticated?: boolean;
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto, @Session() session: SessionData) {
    const { code } = loginDto;

    // 인증번호로 사용자 찾기
    const user = await this.authService.getUserByCode(code);

    if (!user) {
      return {
        success: false,
        message: '유효하지 않은 인증번호입니다.',
      };
    }

    // 세션에 사용자 정보 저장
    session.userId = user.id;
    session.userCode = user.code;
    session.userName = user.name || undefined;
    session.userAccount = user.account || undefined;
    session.isAuthenticated = true;

    console.log(session);
    return {
      success: true,
      message: '로그인 성공',
      user: {
        id: user.id,
        code: user.code,
        name: user.name,
        account: user.account,
      },
    };
  }

  @Get('userId')
  async getCurrentUser(@Session() session: SessionData) {
    if (!session.isAuthenticated || !session.userId) {
      return {
        success: false,
        message: '로그인이 필요합니다.',
      };
    }

    return {
      success: true,
      user: {
        id: session.userId,
      },
    };
  }
}
