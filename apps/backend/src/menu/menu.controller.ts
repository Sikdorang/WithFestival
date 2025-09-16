import { extname } from 'path';

import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  UploadedFile,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { CurrentUser } from '../auth/auth.decorator';
import { AuthGuard } from '../auth/auth.guard';

import { MenuService } from './menu.service';

interface CreateMenuDto {
  menu: string;
  price: number;
  description?: string;
}

// Multer 설정
const multerOptions = {
  dest: './uploads',
  fileFilter: (req: any, file: any, callback: any) => {
    if (file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
      callback(null, true);
    } else {
      callback(new Error('이미지 파일만 업로드 가능합니다.'), false);
    }
  },
  filename: (req: any, file: any, callback: any) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = extname(file.originalname);
    callback(null, `menu-${uniqueSuffix}${ext}`);
  },
};

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Get('user/:userId')
  async getMenusByUserId(@Param('userId') userId: string) {
    try {
      const menus = await this.menuService.getMenusByUserId(parseInt(userId));

      return {
        success: true,
        data: menus,
      };
    } catch (error) {
      return {
        success: false,
        message: '메뉴 조회에 실패했습니다.',
        error: error.message,
      };
    }
  }

  @Post()
  @UseGuards(AuthGuard)
  async createMenu(
    @Body() createMenuDto: CreateMenuDto,
    @CurrentUser() user: any,
  ) {
    try {
      const menuData = {
        ...createMenuDto,
        userId: user.id,
      };

      const menu = await this.menuService.createMenu(menuData);
      return {
        success: true,
        message: '메뉴가 등록되었습니다.',
        data: menu,
      };
    } catch (error) {
      return {
        success: false,
        message: '메뉴 등록에 실패했습니다.',
        error: error.message,
      };
    }
  }

  @Post(':menuId/image')
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('image', multerOptions))
  async uploadImage(
    @Param('menuId') menuId: string,
    @UploadedFile() file: any,
    @CurrentUser() user: any,
  ) {
    try {
      if (!file) {
        return {
          success: false,
          message: '이미지 파일이 업로드되지 않았습니다.',
        };
      }

      // 해당 메뉴가 현재 사용자의 것인지 확인
      const menu = await this.menuService.getMenuById(
        parseInt(menuId),
        user.id,
      );
      if (!menu) {
        return {
          success: false,
          message: '메뉴를 찾을 수 없거나 권한이 없습니다.',
        };
      }

      const imageUrl = `/uploads/${file.filename}`;

      // 메뉴에 이미지 URL 업데이트
      const updatedMenu = await this.menuService.updateMenuImage(
        parseInt(menuId),
        imageUrl,
      );

      return {
        success: true,
        message: '이미지가 업로드되었습니다.',
        data: {
          imageUrl,
          filename: file.filename,
          originalName: file.originalname,
          size: file.size,
          menu: updatedMenu,
        },
      };
    } catch (error) {
      return {
        success: false,
        message: '이미지 업로드에 실패했습니다.',
        error: error.message,
      };
    }
  }
}
