import { createParamDecorator, ExecutionContext } from '@nestjs/common';

interface SessionData {
  userId?: number;
  userCode?: string;
  userName?: string;
  userAccount?: string;
  isAuthenticated?: boolean;
}

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const session: SessionData = request.session;

    return {
      id: session.userId,
      code: session.userCode,
      name: session.userName,
      account: session.userAccount,
    };
  },
);
