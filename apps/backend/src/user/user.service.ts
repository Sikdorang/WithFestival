import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

interface UpdateAccountDto {
  account: string;
}

interface UpdateBoothNameDto {
  name: string;
}

interface UpdateNoticeDto {
  notice: string;
}

interface UpdateEventDto {
  event: string;
}

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getUserById(userId: number) {
    return this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        code: true,
        name: true,
        account: true,
        notice: true,
        event: true,
      },
    });
  }

  async updateAccount(userId: number, data: UpdateAccountDto) {
    return this.prisma.user.update({
      where: { id: userId },
      data: {
        account: data.account,
      },
      select: {
        id: true,
        code: true,
        name: true,
        account: true,
        notice: true,
        event: true,
      },
    });
  }

  async updateBoothName(userId: number, data: UpdateBoothNameDto) {
    return this.prisma.user.update({
      where: { id: userId },
      data: {
        name: data.name,
      },
      select: {
        id: true,
        code: true,
        name: true,
        account: true,
        notice: true,
        event: true,
      },
    });
  }

  async updateNotice(userId: number, data: UpdateNoticeDto) {
    return this.prisma.user.update({
      where: { id: userId },
      data: {
        notice: data.notice,
      },
      select: {
        id: true,
        code: true,
        name: true,
        account: true,
        notice: true,
        event: true,
      },
    });
  }

  async updateEvent(userId: number, data: UpdateEventDto) {
    return this.prisma.user.update({
      where: { id: userId },
      data: {
        event: data.event,
      },
      select: {
        id: true,
        code: true,
        name: true,
        account: true,
        notice: true,
        event: true,
      },
    });
  }
}
