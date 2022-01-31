import { Injectable } from '@nestjs/common';
import { ID } from '../id.type';
import { ISupportRequestEmployeeService, MarkMessagesAsReadDto } from './interfaces';
import { Message } from './schemas/Message.schema';

@Injectable()
export class SupportEmployeeService implements ISupportRequestEmployeeService {
    markMessagesAsRead(params: MarkMessagesAsReadDto) {
        throw new Error('Method not implemented.');
    }
    getUnreadCount(supportRequest: ID): Promise<Message[]> {
        throw new Error('Method not implemented.');
    }
    closeRequest(supportRequest: ID): Promise<void> {
        throw new Error('Method not implemented.');
    }
}
