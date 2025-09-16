import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

interface SessionData {
  userId?: number;
  userCode?: string;
  userName?: string;
  userAccount?: string;
  isAuthenticated?: boolean;
}

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const session: SessionData = request.session;

    if (!session || !session.isAuthenticated) {
      throw new UnauthorizedException('로그인이 필요합니다.');
    }

    return true;
  }
}
