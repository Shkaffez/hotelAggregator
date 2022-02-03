import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ID } from 'src/modules/id.type';

export type ReservationDocument = Reservation & Document;

@Schema()
export class Reservation {
    @Prop({ required: true, unique: true })
    _id: ID;

    @Prop({ required: true })
    userId: ID;

    @Prop({ required: true })
    hotelId: ID;

    @Prop({ required: true })
    roomId: ID;

    @Prop({ required: true })
    dateStart: Date;

    @Prop({ required: true })
    dateEnd: Date;
}

export const ReservationSchema = SchemaFactory.createForClass(Reservation);