import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { ID } from '../id.type';
import { IReservation, ReservationDto, ReservationSearchOptions } from './interfaces';
import { Reservation, ReservationDocument } from './schemas/reservation.schema';

@Injectable()
export class ReservationService implements IReservation {
    constructor(
        @InjectModel(Reservation.name) private readonly HotelModel: Model<ReservationDocument>,
        @InjectConnection() private connection: Connection
    ) {}

    addReservation(data: ReservationDto): Promise<Reservation> {
        throw new Error('Method not implemented.');
    }
    removeReservation(id: ID): Promise<void> {
        throw new Error('Method not implemented.');
    }
    getReservations(filter: ReservationSearchOptions): Promise<Reservation[]> {
        throw new Error('Method not implemented.');
    }
}
