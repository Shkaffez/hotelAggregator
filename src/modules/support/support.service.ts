import { Injectable } from '@nestjs/common';
import { ID } from '../id.type';
import { GetChatListParams, ISupportRequestService, SendMessageDto } from './interfaces';
import { Message } from './schemas/Message.schema';
import { SupportRequest } from './schemas/SupportRequest.schema';

@Injectable()
export class SupportService implements ISupportRequestService {
    findSupportRequests(params: GetChatListParams): Promise<SupportRequest[]> {
        throw new Error('Method not implemented.');
    }
    sendMessage(data: SendMessageDto): Promise<Message> {
        throw new Error('Method not implemented.');
    }
    getMessages(supportRequest: ID): Promise<Message[]> {
        throw new Error('Method not implemented.');
    }
    subscribe(handler: (supportRequest: SupportRequest, message: Message) => void): () => void {
        throw new Error('Method not implemented.');
    }
}
