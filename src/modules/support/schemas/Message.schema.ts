import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import * as mongoose from 'mongoose';

export type MessageDocument = Message & Document;

@Schema()
export class Message {
    @Prop({ required: true, unique: true })
    _id: mongoose.Types.ObjectId;

    @Prop({ required: true })
    author: mongoose.Types.ObjectId;

    @Prop({ required: true })
    sentAt: Date;

    @Prop({ required: true })
    text: string;

    @Prop()
    readAt: Date;
}

export const MessageSchema = SchemaFactory.createForClass(Message);