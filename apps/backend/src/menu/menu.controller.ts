import { unlink } from 'fs/promises';
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
  Delete,
  Patch,
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

interface UpdateMenuDto {
  menu?: string;
  price?: number;
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

  @Get('user-info')
  @UseGuards(AuthGuard)
  async getUserInfo(@CurrentUser() user: any) {
    try {
      const userInfo = await this.menuService.getUserInfo(user.id);

      if (!userInfo) {
        return {
          success: false,
          message: '사용자 정보를 찾을 수 없습니다.',
        };
      }

      return {
        success: true,
        data: {
          name: userInfo.name,
          account: userInfo.account,
        },
      };
    } catch (error) {
      return {
        success: false,
        message: '사용자 정보 조회에 실패했습니다.',
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

  @Delete(':menuId/image')
  @UseGuards(AuthGuard)
  async deleteImage(@Param('menuId') menuId: string, @CurrentUser() user: any) {
    try {
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

      if (!menu.image) {
        return {
          success: false,
          message: '삭제할 이미지가 없습니다.',
        };
      }

      // 파일 경로에서 실제 파일명 추출
      const filename = menu.image.split('/').pop();
      const filePath = `./uploads/${filename}`;

      try {
        // 파일 시스템에서 파일 삭제
        await unlink(filePath);
      } catch (fileError) {
        // 파일이 이미 삭제되었거나 없는 경우는 무시
        console.log('파일 삭제 중 오류 (무시됨):', fileError.message);
      }

      // 데이터베이스에서 이미지 URL 제거
      const updatedMenu = await this.menuService.updateMenuImage(
        parseInt(menuId),
        null,
      );

      return {
        success: true,
        message: '이미지가 삭제되었습니다.',
        data: {
          menu: updatedMenu,
        },
      };
    } catch (error) {
      return {
        success: false,
        message: '이미지 삭제에 실패했습니다.',
        error: error.message,
      };
    }
  }

  @Delete(':menuId')
  @UseGuards(AuthGuard)
  async deleteMenu(@Param('menuId') menuId: string, @CurrentUser() user: any) {
    try {
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

      // 이미지가 있는 경우 파일 시스템에서도 삭제
      if (menu.image) {
        try {
          const filename = menu.image.split('/').pop();
          const filePath = `./uploads/${filename}`;
          await unlink(filePath);
        } catch (fileError) {
          // 파일이 이미 삭제되었거나 없는 경우는 무시
          console.log('파일 삭제 중 오류 (무시됨):', fileError.message);
        }
      }

      // 데이터베이스에서 메뉴 삭제
      await this.menuService.deleteMenu(parseInt(menuId));

      return {
        success: true,
        message: '메뉴가 삭제되었습니다.',
        data: {
          deletedMenuId: parseInt(menuId),
        },
      };
    } catch (error) {
      return {
        success: false,
        message: '메뉴 삭제에 실패했습니다.',
        error: error.message,
      };
    }
  }

  @Patch(':menuId')
  @UseGuards(AuthGuard)
  async updateMenu(
    @Param('menuId') menuId: string,
    @Body() updateMenuDto: UpdateMenuDto,
    @CurrentUser() user: any,
  ) {
    try {
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

      // 메뉴 정보 업데이트
      const updatedMenu = await this.menuService.updateMenu(
        parseInt(menuId),
        updateMenuDto,
      );

      return {
        success: true,
        message: '메뉴가 수정되었습니다.',
        data: updatedMenu,
      };
    } catch (error) {
      return {
        success: false,
        message: '메뉴 수정에 실패했습니다.',
        error: error.message,
      };
    }
  }
}
