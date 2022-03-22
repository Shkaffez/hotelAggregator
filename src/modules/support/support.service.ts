import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { ID } from '../id.type';
import { ISupportRequestService, SendMessagedto } from './interfaces';
import { Message, MessageDocument } from './schemas/Message.schema';
import {
  SupportRequest,
  SupportRequestDocument,
} from './schemas/SupportRequest.schema';
import * as mongoose from 'mongoose';

@Injectable()
export class SupportService implements ISupportRequestService {
  constructor(
    @InjectModel(SupportRequest.name)
    private readonly SupportRequestModel: Model<SupportRequestDocument>,
    @InjectModel(Message.name)
    private readonly MessageModel: Model<MessageDocument>,
    @InjectConnection() private connection: Connection,
  ) { }

  async sendMessage(data: SendMessagedto): Promise<Message> {
    const _id = new mongoose.Types.ObjectId();
    let { author, supportRequest, text } = data;
    const message = new this.MessageModel({ _id, author, text });
    await message.save();
    supportRequest = new mongoose.Types.ObjectId(supportRequest);
    const request = await this.SupportRequestModel.findById(supportRequest);
    request.messages.push(message);
    await request.save();
    let response = await this.MessageModel.findById(_id)
      .populate({
        path: 'author',
        select: '_id name',
      })
      .select('-__v');
    return response;
  }

  async getMessages(supportRequest: ID, user): Promise<Message[]> {
    supportRequest = new mongoose.Types.ObjectId(supportRequest);
    const supportRequestData = await this.SupportRequestModel.findById(
      supportRequest,
    );
    if (user.role === 'client' && !user._id.equal(supportRequestData.user)) {
      throw new HttpException(
        'this another user support request',
        HttpStatus.FORBIDDEN,
      );
    }
    const messages = supportRequestData.messages.map(async (message) => {
      const messageId = new mongoose.Types.ObjectId(message._id);
      const data = await this.MessageModel.findById(messageId)
        .populate({ path: 'author', select: '_id name' })
        .select('-__v');
      return data;
    });
    return Promise.all(messages);
  }

  subscribe(
    handler: (supportRequest: SupportRequest, message: Message) => void,
  ): () => void {
    throw new Error('Method not implemented.');
  }
}
