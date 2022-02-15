import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import * as mongoose from 'mongoose';

export type ReservationDocument = Reservation & Document;

@Schema()
export class Reservation {

    @Prop({ required: true })
    userId: mongoose.Types.ObjectId;

    @Prop({ required: true, type: MongooseSchema.Types.ObjectId, ref: 'Hotel' })
    hotelId: mongoose.Types.ObjectId;

    @Prop({ required: true, type: MongooseSchema.Types.ObjectId, ref: 'HotelRoom' })
    roomId: mongoose.Types.ObjectId;

    @Prop({ required: true })
    dateStart: Date;

    @Prop({ required: true })
    dateEnd: Date;
}

export const ReservationSchema = SchemaFactory.createForClass(Reservation);