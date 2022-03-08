import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { ID } from '../id.type';
import {
  CreateSupportRequestDto,
  ISupportRequestClientService,
  MarkMessagesAsReadDto,
  SearchSupportRequestParams,
} from './interfaces';
import { Message, MessageDocument } from './schemas/Message.schema';
import {
  SupportRequest,
  SupportRequestDocument,
} from './schemas/SupportRequest.schema';
import * as mongoose from 'mongoose';

@Injectable()
export class SupportClientService implements ISupportRequestClientService {
  constructor(
    @InjectModel(SupportRequest.name)
    private readonly SupportRequestModel: Model<SupportRequestDocument>,
    @InjectModel(Message.name)
    private readonly MessageModel: Model<MessageDocument>,
    @InjectConnection() private connection: Connection,
  ) {}

  async createSupportRequest(
    data: CreateSupportRequestDto,
  ): Promise<SupportRequest> {
    const _id = new mongoose.Types.ObjectId();
    const messageId = new mongoose.Types.ObjectId();
    const { user, text } = data;
    const message = new this.MessageModel({
      _id: messageId,
      author: user,
      text: text,
      sentAt: new Date(),
    });
    message.save();
    const newSupportRequest = new this.SupportRequestModel({ _id });
    newSupportRequest.messages.push(message);
    newSupportRequest.user = user;
    await newSupportRequest.save();
    return await this.SupportRequestModel.findById(_id).select(
      '_id createdAt isActive',
    );
  }

  async getClientSupportRequests(data: SearchSupportRequestParams, userId: ID) {
    const { limit, offset, isActive } = data;
    const user = new mongoose.Types.ObjectId(userId);
    let filter = { isActive: undefined };
    if (isActive) {
      filter.isActive = { isActive };
    }
    if (!filter.isActive) {
      delete filter.isActive;
    }
    let supportRequests = await this.SupportRequestModel.find({
      user: user,
      ...filter,
    })
      .skip(offset)
      .limit(limit)
      .select('_id createdAt isActive');

    let hasNewMessages = supportRequests.map(async (supportRequest) => {
      let newMessageCount = await this.getUnreadCount(supportRequest._id);
      if (newMessageCount > 0) {
        return {
          id: supportRequest._id,
          createdAt: supportRequest.createdAt,
          isActive: supportRequest.isActive,
          hasNewMessages: true,
        };
      }
      return {
        id: supportRequest._id,
        createdAt: supportRequest.createdAt,
        isActive: supportRequest.isActive,
        hasNewMessages: false,
      };
    });
    return Promise.all(hasNewMessages);
  }

  async markMessagesAsRead(params: MarkMessagesAsReadDto) {
    let { supportRequest, user } = params;
    supportRequest = new mongoose.Types.ObjectId(supportRequest);
    const supportRequestData = await this.SupportRequestModel.findById(
      supportRequest,
    );
    if (supportRequestData.user.toString() !== user.toString()) {
      throw new HttpException(
        'this another user support request',
        HttpStatus.FORBIDDEN,
      );
    }
    supportRequestData.messages.forEach(async (msg) => {
      if (msg.author.toString() !== user.toString() && !msg.readAt) {
        const message = await this.MessageModel.findById(msg._id);
        message.readAt = new Date();
        await message.save();
      }
      return;
    });
    supportRequestData.messages.forEach((msg) => {
      if (msg.author.toString() !== user.toString() && !msg.readAt) {
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
    const user = supportRequestData.user;
    const messages = supportRequestData.messages;
    let count = 0;
    for (let i = 0; i < messages.length; i++) {
      if (
        messages[i].author.toString() !== user.toString() &&
        !messages[i].readAt
      ) {
        count++;
      }
    }

    return count;
  }
}
