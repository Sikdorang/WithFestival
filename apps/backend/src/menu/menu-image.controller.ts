import { Controller, Patch, Param, Body, UseGuards } from '@nestjs/common';

import { CurrentUser } from '../auth/auth.decorator';
import { AuthGuard } from '../auth/auth.guard';
import { UploadService } from '../upload/upload.service';

import { MenuService } from './menu.service';

@Controller('menu')
export class MenuImageController {
  constructor(
    private readonly menuService: MenuService,
    private readonly uploadService: UploadService,
  ) {}

  @Patch(':menuId/image/upload-url')
  @UseGuards(AuthGuard)
  async getImageUploadUrl(
    @Param('menuId') menuId: string,
    @Body() body: { fileName: string },
    @CurrentUser() user: { id: number },
  ) {
    try {
      // fileName 검증
      if (!body?.fileName) {
        return {
          success: false,
          message: 'fileName이 제공되지 않았습니다.',
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

      // 기존 이미지가 있는지 확인
      const hasExistingImage = menu.image !== null;

      // 키 생성
      const key = this.uploadService.generateKey(
        user.id,
        parseInt(menuId),
        body.fileName,
      );

      console.log('=== Upload Debug ===');
      console.log('Original fileName:', body.fileName);
      console.log('Generated key:', key);
      console.log('AWS_REGION:', process.env.AWS_REGION);
      console.log('S3_BUCKET_NAME:', process.env.S3_BUCKET_NAME);

      // Presigned URL 생성
      const presignedUrl = await this.uploadService.getPresignedUrl(
        key,
        'image/jpeg',
      );

      console.log('Generated presigned URL:', presignedUrl);

      // DB에 키 저장 (기존 이미지가 있으면 교체, 없으면 추가)
      const updatedMenu = await this.menuService.updateMenuImage(
        parseInt(menuId),
        key,
      );

      // CDN URL 생성
      const publicUrl = this.uploadService.generatePublicUrl(key);

      return {
        success: true,
        message: hasExistingImage
          ? '이미지 교체 URL이 생성되었습니다.'
          : '이미지 추가 URL이 생성되었습니다.',
        data: {
          key,
          uploadUrl: presignedUrl,
          publicUrl,
          originalName: body.fileName,
          menu: updatedMenu,
          isReplacement: hasExistingImage,
        },
      };
    } catch (error) {
      return {
        success: false,
        message: '업로드 URL 생성에 실패했습니다.',
        error: error instanceof Error ? error.message : '알 수 없는 오류',
      };
    }
  }
}
