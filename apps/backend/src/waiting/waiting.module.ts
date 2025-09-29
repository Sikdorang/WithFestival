import { Module } from '@nestjs/common';

import { WaitingSenderGateway } from '../websocket/waiting/waiting-sender.gateway';

import { WaitingController } from './waiting.controller';
import { WaitingService } from './waiting.service';

@Module({
  controllers: [WaitingController],
  providers: [WaitingService, WaitingSenderGateway],
  exports: [WaitingService],
})
export class WaitingModule {}
