import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

interface CreateMenuDto {
  menu: string;
  price: number;
  description?: string;
  margin?: number;
  userId: number;
}

interface UpdateMenuDto {
  menu?: string;
  price?: number;
  description?: string;
  margin?: number;
}

@Injectable()
export class MenuService {
  constructor(private prisma: PrismaService) {}

  async getMenus(userId: number) {
    return this.prisma.menu.findMany({
      orderBy: {
        id: 'asc',
      },
      where: {
        userid: userId,
      },
    });
  }

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
        margin: data.margin || null,
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

  async updateMenuImage(menuId: number, imageUrl: string | null) {
    return this.prisma.menu.update({
      where: { id: menuId },
      data: { image: imageUrl },
    });
  }

  async deleteMenu(menuId: number) {
    return this.prisma.menu.delete({
      where: { id: menuId },
    });
  }

  async updateMenu(menuId: number, data: UpdateMenuDto) {
    // 전달된 필드만 업데이트하도록 필터링
    const updateData: any = {};

    if (data.menu !== undefined) {
      updateData.menu = data.menu;
    }
    if (data.price !== undefined) {
      updateData.price = data.price;
    }
    if (data.description !== undefined) {
      updateData.description = data.description;
    }
    if (data.margin !== undefined) {
      updateData.margin = data.margin;
    }

    return this.prisma.menu.update({
      where: { id: menuId },
      data: updateData,
    });
  }

  async getUserInfo(userId: number) {
    return this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        name: true,
        account: true,
        notice: true,
        event: true,
      },
    });
  }
}
