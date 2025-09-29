import { Module } from '@nestjs/common';

import { UploadService } from '../upload/upload.service';

import { MenuImageController } from './menu-image.controller';
import { MenuController } from './menu.controller';
import { MenuService } from './menu.service';

@Module({
  controllers: [MenuController, MenuImageController],
  providers: [MenuService, UploadService],
  exports: [MenuService],
})
export class MenuModule {}
