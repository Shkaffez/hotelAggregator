import { ID } from "../id.type";
import { Message } from "./schemas/Message.schema";
import { SupportRequest } from "./schemas/SupportRequest.schema";

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
    createdBefore: Date;
}

export interface GetChatListParams {
    user: ID | null;
    isActive: boolean;
}

export interface SearchSupportRequestParams {
    limit: Number;
    offset: Number;
    isActive: Boolean;
}

export interface ISupportRequestService {
    findSupportRequests(params: GetChatListParams): Promise<SupportRequest[]>;
    sendMessage(data: SendMessageDto): Promise<Message>;
    getMessages(supportRequest: ID): Promise<Message[]>;
    subscribe(
        handler: (supportRequest: SupportRequest, message: Message) => void
    ): () => void;
}

export interface ISupportRequestClientService {
    createSupportRequest(data: CreateSupportRequestDto): Promise<SupportRequest>;
    markMessagesAsRead(params: MarkMessagesAsReadDto);
    getUnreadCount(supportRequest: ID): Promise<number>;
}

export interface ISupportRequestEmployeeService {
    markMessagesAsRead(params: MarkMessagesAsReadDto);
    getUnreadCount(supportRequest: ID): Promise<number>;
    closeRequest(supportRequest: ID): Promise<void>;
}