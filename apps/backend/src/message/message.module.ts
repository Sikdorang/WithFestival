import { Module } from '@nestjs/common';

import { MessageSenderGateway } from '../websocket/message/message-sender.gateway';

import { MessageController } from './message.controller';
import { MessageService } from './message.service';

@Module({
  controllers: [MessageController],
  providers: [MessageService, MessageSenderGateway],
  exports: [MessageService],
})
export class MessageModule {}
