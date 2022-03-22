import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { ID } from 'src/modules/id.type';
import * as mongoose from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type MessageDocument = Message & Document;

@Schema()
export class Message {
  @Prop()
  @ApiProperty({ type: mongoose.Types.ObjectId })
  _id: mongoose.Types.ObjectId;

  @Prop({ required: true, type: MongooseSchema.Types.ObjectId, ref: 'User' })
  @ApiProperty({ type: String })
  author: ID;

  @Prop({ required: true, default: new Date() })
  @ApiProperty()
  sentAt: Date;

  @Prop({ required: true })
  @ApiProperty()
  text: string;

  @Prop()
  @ApiProperty()
  readAt: Date;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
