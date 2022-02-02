import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

export type HotelDocument = Hotel & Document;

@Schema()
export class Hotel {
    @Prop({ required: true, unique: true })
    _id: mongoose.Types.ObjectId;

    @Prop({ required: true })
    title: string;

    @Prop()
    description: string;

    @Prop({ required: true, default: new Date().toUTCString })
    createdAt: Date;

    @Prop({ required: true })
    updatedAt: Date;
}

export const HotelSchema = SchemaFactory.createForClass(Hotel);