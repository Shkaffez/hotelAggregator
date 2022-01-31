import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

export type ReservationDocument = Reservation & Document;

@Schema()
export class Reservation {
    @Prop({ required: true, unique: true })
    _id: mongoose.Types.ObjectId;

    @Prop({ required: true })
    userId: mongoose.Types.ObjectId;

    @Prop({ required: true })
    hotelId: mongoose.Types.ObjectId;

    @Prop({ required: true })
    roomId: mongoose.Types.ObjectId;

    @Prop({ required: true })
    dateStart: Date;

    @Prop({ required: true })
    dateEnd: Date;
}

export const ReservationSchema = SchemaFactory.createForClass(Reservation);