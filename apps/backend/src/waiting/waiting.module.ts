import { Module } from '@nestjs/common';

import { WebSocketModule } from '../websocket/websocket.module';

import { WaitingController } from './waiting.controller';
import { WaitingService } from './waiting.service';

@Module({
  imports: [WebSocketModule],
  controllers: [WaitingController],
  providers: [WaitingService],
  exports: [WaitingService],
})
export class WaitingModule {}
