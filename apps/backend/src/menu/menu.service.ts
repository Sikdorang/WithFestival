import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

interface CreateMenuDto {
  menu: string;
  price: number;
  description?: string;
  userId: number;
}

@Injectable()
export class MenuService {
  constructor(private prisma: PrismaService) {}

  async getMenusByUserId(userId: number) {
    return this.prisma.menu.findMany({
      where: {
        userid: userId,
      },
      orderBy: {
        id: 'asc',
      },
    });
  }

  async createMenu(data: CreateMenuDto) {
    return this.prisma.menu.create({
      data: {
        menu: data.menu,
        price: data.price,
        image: null, // 이미지는 별도 API로 등록
        description: data.description || null,
        userid: data.userId,
      },
    });
  }

  async getMenuById(menuId: number, userId: number) {
    return this.prisma.menu.findFirst({
      where: {
        id: menuId,
        userid: userId,
      },
    });
  }

  async updateMenuImage(menuId: number, imageUrl: string) {
    return this.prisma.menu.update({
      where: { id: menuId },
      data: { image: imageUrl },
    });
  }
}
