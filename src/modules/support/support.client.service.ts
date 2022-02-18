import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { ID } from '../id.type';
import { CreateSupportRequestDto, ISupportRequestClientService, MarkMessagesAsReadDto, SearchSupportRequestParams } from './interfaces';
import { Message, MessageDocument } from './schemas/Message.schema';
import { SupportRequest, SupportRequestDocument } from './schemas/SupportRequest.schema';
import * as mongoose from 'mongoose';

@Injectable()
export class SupportClientService implements ISupportRequestClientService {
    constructor(
        @InjectModel(SupportRequest.name) private readonly SupportRequestModel: Model<SupportRequestDocument>,
        @InjectModel(Message.name) private readonly MessageModel: Model<MessageDocument>,
        @InjectConnection() private connection: Connection
    ) { }

    async createSupportRequest(data: CreateSupportRequestDto): Promise<SupportRequest> {
        const _id = new mongoose.Types.ObjectId();
        const { user, text } = data;
        const message = new this.MessageModel({
            author: user,
            text: text,
            sentAt: new Date()
        });
        message.save();
        const newSupportRequest = new this.SupportRequestModel({ _id });
        newSupportRequest.messages.push(message);
        newSupportRequest.user = user;
        await newSupportRequest.save();
        return await this.SupportRequestModel.findById(_id)
            .select('_id createdAt isActive');
    }

    async getClientSupportRequests(data: SearchSupportRequestParams, userId: ID) {
        throw new Error('Method not implemented.');
    }


    markMessagesAsRead(params: MarkMessagesAsReadDto) {
        throw new Error('Method not implemented.');
    }
    async getUnreadCount(supportRequest: ID): Promise<number> {
        supportRequest = new mongoose.Types.ObjectId(supportRequest);
        const supportRequestData = await this.SupportRequestModel.findById(supportRequest);
        const user = supportRequestData.user;
        const messages = supportRequestData.messages;
        let count = 0;
        for (let i = 0; i < messages.length; i++) {
            if ((messages[i].author.toString() !== user.toString()) && !messages[i].readAt) {
                count++;
            }
        }

        return count;
    }
}
