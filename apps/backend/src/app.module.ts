import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MenuModule } from './menu/menu.module';
import { OrderModule } from './order/order.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { WaitingModule } from './waiting/waiting.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    WaitingModule,
    MenuModule,
    UserModule,
    OrderModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
