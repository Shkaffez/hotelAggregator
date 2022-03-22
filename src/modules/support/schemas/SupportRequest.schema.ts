import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { ID } from 'src/modules/id.type';
import { Message, MessageSchema } from './Message.schema';
import * as mongoose from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type SupportRequestDocument = SupportRequest & Document;

@Schema()
export class SupportRequest {
  @Prop()
  @ApiProperty({ type: mongoose.Types.ObjectId })
  _id: mongoose.Types.ObjectId;

  @Prop({ required: true, type: MongooseSchema.Types.ObjectId, ref: 'User' })
  @ApiProperty({ type: String })
  user: ID;

  @Prop({ required: true, default: new Date() })
  @ApiProperty()
  createdAt: Date;

  @Prop({ type: [MessageSchema] })
  @ApiProperty()
  messages: mongoose.Types.Array<Message>;

  @Prop({ default: true })
  @ApiProperty()
  isActive: boolean;
}

export const SupportRequestSchema =
  SchemaFactory.createForClass(SupportRequest);
