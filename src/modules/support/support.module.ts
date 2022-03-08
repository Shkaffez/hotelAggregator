import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatGateway } from './chat.gateway';
import { Message, MessageSchema } from './schemas/Message.schema';
import {
  SupportRequest,
  SupportRequestSchema,
} from './schemas/SupportRequest.schema';
import { SupportClientService } from './support.client.service';
import { SupportController } from './support.controller';
import { SupportEmployeeService } from './support.employee.service';
import { SupportService } from './support.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Message.name, schema: MessageSchema },
      { name: SupportRequest.name, schema: SupportRequestSchema },
    ]),
  ],
  providers: [
    SupportService,
    SupportClientService,
    SupportEmployeeService,
    ChatGateway,
  ],
  controllers: [SupportController],
})
export class SupportModule {}
