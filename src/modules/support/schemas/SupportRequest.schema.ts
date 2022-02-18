import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { ID } from 'src/modules/id.type';
import { Message } from './Message.schema';
import * as mongoose from 'mongoose';

export type SupportRequestDocument = SupportRequest & Document;

@Schema()
export class SupportRequest {
    @Prop()
    _id: mongoose.Types.ObjectId;

    @Prop({ required: true, type: mongoose.Types.ObjectId })
    user: ID;

    @Prop({ required: true, default: new Date() })
    createdAt: Date;

    @Prop()
    messages: Message[];

    @Prop({ default: true })
    isActive: boolean;
}

export const SupportRequestSchema = SchemaFactory.createForClass(SupportRequest);