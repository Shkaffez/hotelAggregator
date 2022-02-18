import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { ID } from '../id.type';
import { GetChatListParams, ISupportRequestService, SendMessageDto } from './interfaces';
import { Message, MessageDocument } from './schemas/Message.schema';
import { SupportRequest, SupportRequestDocument } from './schemas/SupportRequest.schema';
import * as mongoose from 'mongoose';

@Injectable()
export class SupportService implements ISupportRequestService {
    constructor(
        @InjectModel(SupportRequest.name) private readonly SupportRequestModel: Model<SupportRequestDocument>,
        @InjectModel(Message.name) private readonly MessageModel: Model<MessageDocument>,
        @InjectConnection() private connection: Connection
    ) { }
    async findSupportRequests(params: GetChatListParams): Promise<SupportRequest[]> {
        throw new Error('Method not implemented.');
    }
    async sendMessage(data: SendMessageDto): Promise<Message> {
        let { author, supportRequest, text } = data;
        const message = new this.MessageModel({ author, text });
        message.save();
        supportRequest = new mongoose.Types.ObjectId(supportRequest);
        const request = await this.SupportRequestModel.findById(supportRequest);
        request.messages.push(message);
        request.save();
        return await this.MessageModel.findById({ _id: message._id }).populate({
            path: 'author', select: '_id name'
        }).select('-__v');
    }


    async getMessages(supportRequest: ID): Promise<Message[]> {
        throw new Error('Method not implemented.');
    }
    subscribe(handler: (supportRequest: SupportRequest, message: Message) => void): () => void {
        throw new Error('Method not implemented.');
    }
}
