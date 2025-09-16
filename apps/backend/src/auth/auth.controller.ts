// auth.controller.ts
import { Controller, Post, Body, Req } from '@nestjs/common';
import { Request } from 'express';

import { AuthService } from './auth.service';

interface LoginDto {
  code: string;
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() { code }: LoginDto, @Req() req: Request) {
    // 1) 사용자 검증
    const user = await this.authService.getUserByCode(code);
    if (!user) {
      return { success: false, message: '유효하지 않은 인증번호입니다.' };
    }

    // 2) 세션 고정 방지: 로그인 시 새 세션 ID 발급
    await new Promise<void>((resolve, reject) =>
      req.session.regenerate((err) => (err ? reject(err) : resolve())),
    );

    // 3) 세션에 로그인 상태 기록
    (req.session as any).userId = user.id;
    (req.session as any).userCode = user.code;
    (req.session as any).userName = user.name;
    (req.session as any).userAccount = user.account ?? undefined;
    (req.session as any).isAuthenticated = true;

    // 4) 저장 보장(선택이지만 권장)
    await new Promise<void>((resolve, reject) =>
      req.session.save((err) => (err ? reject(err) : resolve())),
    );

    // 서버 로그로 sid 확인 (프론트는 몰라도/안봐도 됨)
    console.log('sessionID:', req.sessionID);

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
}
