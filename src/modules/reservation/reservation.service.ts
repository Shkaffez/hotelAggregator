import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
// import { Hotel, HotelDocument } from '../hotels/schemas/hotel.schema';
// import { HotelRoom, HotelRoomDocument } from '../hotels/schemas/HotelRoom.schema';
import { ID } from '../id.type';
import { IReservation, ReservationDto, ReservationSearchOptions } from './interfaces';
import { Reservation, ReservationDocument } from './schemas/reservation.schema';

@Injectable()
export class ReservationService implements IReservation {
    constructor(
        @InjectModel(Reservation.name) private readonly ReservationModel: Model<ReservationDocument>,
        // @InjectModel(Hotel.name) private readonly HotelModel: Model<HotelDocument>,
        // @InjectModel(HotelRoom.name) private readonly HotelRoomModel: Model<HotelRoomDocument>,
        @InjectConnection() private connection: Connection
    ) { }

    async addReservation(data: ReservationDto): Promise<Reservation> {
        const newReservation = new this.ReservationModel(data);
        try {
            await newReservation.save();
            const reservInfo = await this.ReservationModel.findById({ _id: newReservation._id })
                .populate({ path: 'hotelRoom', select: 'title description images' })
                .populate({ path: 'Hotel', select: 'title description' })
                .select('startDate endDate hotelRoom hotel').exec();
            return reservInfo;
        } catch (e) {
            console.log(e);
        }
    }

    async removeReservation(id: ID): Promise<void> {
        throw new Error('Method not implemented.');
    }
    async getReservations(filter: ReservationSearchOptions): Promise<Reservation[]> {
        throw new Error('Method not implemented.');
    }
}
