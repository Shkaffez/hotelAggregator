import { Injectable } from '@nestjs/common';
import { ID } from '../id.type';
import {
  ISupportRequestEmployeeService,
  MarkMessagesAsReadDto,
  SearchSupportRequestParams,
} from './interfaces';
import { Message, MessageDocument } from './schemas/Message.schema';
import * as mongoose from 'mongoose';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import {
  SupportRequest,
  SupportRequestDocument,
} from './schemas/SupportRequest.schema';
import { Connection, Model } from 'mongoose';

@Injectable()
export class SupportEmployeeService implements ISupportRequestEmployeeService {
  constructor(
    @InjectModel(SupportRequest.name)
    private readonly SupportRequestModel: Model<SupportRequestDocument>,
    @InjectModel(Message.name)
    private readonly MessageModel: Model<MessageDocument>,
    @InjectConnection() private connection: Connection,
  ) {}

  async markMessagesAsRead(params: MarkMessagesAsReadDto) {
    let { supportRequest } = params;
    supportRequest = new mongoose.Types.ObjectId(supportRequest);
    const supportRequestData = await this.SupportRequestModel.findById(
      supportRequest,
    );
    const supportRequestAuthor = supportRequestData.user;
    supportRequestData.messages.forEach(async (msg) => {
      if (
        msg.author.toString() === supportRequestAuthor.toString() &&
        !msg.readAt
      ) {
        const message = await this.MessageModel.findById(msg._id);
        message.readAt = new Date();
        await message.save();
      }
      return;
    });
    supportRequestData.messages.forEach((msg) => {
      if (
        msg.author.toString() === supportRequestAuthor.toString() &&
        !msg.readAt
      ) {
        msg.readAt = new Date();
      }
      return;
    });
    await supportRequestData.save();
    return { success: true };
  }

  async getUnreadCount(supportRequest: ID): Promise<number> {
    supportRequest = new mongoose.Types.ObjectId(supportRequest);
    const supportRequestData = await this.SupportRequestModel.findById(
      supportRequest,
    );
    const supportRequestAuthor = supportRequestData.user;
    const messages = supportRequestData.messages;
    // support request author is always client, we count all his uread messages
    let count = 0;
    for (let i = 0; i < messages.length; i++) {
      if (
        messages[i].author.toString() === supportRequestAuthor.toString() &&
        !messages[i].readAt
      ) {
        count++;
      }
    }
    return count;
  }

  async getManagerSupportRequests(data: SearchSupportRequestParams) {
    const { limit, offset, isActive } = data;
    let filter = { isActive: undefined };
    if (isActive) {
      filter.isActive = { isActive };
    }
    if (!filter.isActive) {
      delete filter.isActive;
    }
    let supportRequests = await this.SupportRequestModel.find({ ...filter })
      .populate({ path: 'user', select: '_id name email contactPhone' })
      .skip(offset)
      .limit(limit)
      .select('_id createdAt isActive user');

    let hasNewMessages = supportRequests.map(async (supportRequest) => {
      let newMessageCount = await this.getUnreadCount(supportRequest._id);
      if (newMessageCount > 0) {
        return {
          id: supportRequest._id,
          createdAt: supportRequest.createdAt,
          isActive: supportRequest.isActive,
          client: supportRequest.user,
          hasNewMessages: true,
        };
      }
      return {
        id: supportRequest._id,
        createdAt: supportRequest.createdAt,
        isActive: supportRequest.isActive,
        client: supportRequest.user,
        hasNewMessages: false,
      };
    });
    return Promise.all(hasNewMessages);
  }

  async closeRequest(supportRequest: ID): Promise<void> {
    supportRequest = new mongoose.Types.ObjectId(supportRequest);
    await this.SupportRequestModel.findByIdAndUpdate(
      { _id: supportRequest },
      { isActive: false },
    );
    return;
  }
}
