import { ID } from '../id.type';
import { Message } from './schemas/Message.schema';
import { SupportRequest } from './schemas/SupportRequest.schema';

export interface CreateSupportRequestDto {
  user: ID;
  text: string;
}

export interface SendMessageDto {
  author: ID;
  supportRequest: ID;
  text: string;
}
export interface MarkMessagesAsReadDto {
  user: ID;
  supportRequest: ID;
}

export interface GetChatListParams {
  user: ID | null;
  isActive: boolean;
}

export interface SearchSupportRequestParams {
  limit: number;
  offset: number;
  isActive: boolean;
}

export interface ISupportRequestService {
  sendMessage(data: SendMessageDto): Promise<Message>;
  getMessages(supportRequest: ID, user): Promise<Message[]>;
  subscribe(
    handler: (supportRequest: SupportRequest, message: Message) => void,
  ): () => void;
}

export interface ISupportRequestClientService {
  getClientSupportRequests(data: SearchSupportRequestParams, userId: ID);
  createSupportRequest(data: CreateSupportRequestDto): Promise<SupportRequest>;
  markMessagesAsRead(params: MarkMessagesAsReadDto);
  getUnreadCount(supportRequest: ID): Promise<number>;
}

export interface ISupportRequestEmployeeService {
  getManagerSupportRequests(data: SearchSupportRequestParams);
  markMessagesAsRead(params: MarkMessagesAsReadDto);
  getUnreadCount(supportRequest: ID): Promise<number>;
  closeRequest(supportRequest: ID): Promise<void>;
}
