import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async validateAuthCode(code: string): Promise<boolean> {
    const user = await this.prisma.user.findUnique({
      where: { code },
    });
    return !!user;
  }

  async getUserByCode(code: string) {
    const user = await this.prisma.user.findUnique({
      where: { code },
    });

    return user;
  }
}
