import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Message } from './Message.schema';

export type SupportRequestDocument = SupportRequest & Document;

@Schema()
export class SupportRequest {
    @Prop({ required: true, unique: true })
    _id: mongoose.Types.ObjectId;

    @Prop({ required: true })
    user: mongoose.Types.ObjectId;

    @Prop({ required: true })
    createdAt: Date;

    @Prop()
    messages: Message[];

    @Prop()
    isActive: boolean;
}

export const SupportRequestSchema = SchemaFactory.createForClass(SupportRequest);