import { Injectable } from '@nestjs/common';
import { ID } from '../id.type';
import { CreateSupportRequestDto, ISupportRequestClientService, MarkMessagesAsReadDto } from './interfaces';
import { Message } from './schemas/Message.schema';
import { SupportRequest } from './schemas/SupportRequest.schema';

@Injectable()
export class SupportClientService implements ISupportRequestClientService {
    createSupportRequest(data: CreateSupportRequestDto): Promise<SupportRequest> {
        throw new Error('Method not implemented.');
    }
    markMessagesAsRead(params: MarkMessagesAsReadDto) {
        throw new Error('Method not implemented.');
    }
    getUnreadCount(supportRequest: ID): Promise<Message[]> {
        throw new Error('Method not implemented.');
    }
}
