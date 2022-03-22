import { ID } from '../id.type';
import { Message } from './schemas/Message.schema';
import { SupportRequest } from './schemas/SupportRequest.schema';

export interface CreateSupportRequestdto {
  user: ID;
  text: string;
}

export interface SendMessagedto {
  author: ID;
  supportRequest: ID;
  text: string;
}
export interface MarkMessagesAsReaddto {
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
  sendMessage(data: SendMessagedto): Promise<Message>;
  getMessages(supportRequest: ID, user): Promise<Message[]>;
  subscribe(
    handler: (supportRequest: SupportRequest, message: Message) => void,
  ): () => void;
}

export interface ISupportRequestClientService {
  getClientSupportRequests(data: SearchSupportRequestParams, userId: ID);
  createSupportRequest(data: CreateSupportRequestdto): Promise<SupportRequest>;
  markMessagesAsRead(params: MarkMessagesAsReaddto);
  getUnreadCount(supportRequest: ID): Promise<number>;
}

export interface ISupportRequestEmployeeService {
  getManagerSupportRequests(data: SearchSupportRequestParams);
  markMessagesAsRead(params: MarkMessagesAsReaddto);
  getUnreadCount(supportRequest: ID): Promise<number>;
  closeRequest(supportRequest: ID): Promise<void>;
}
