import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { ID } from '../id.type';
import { HotelRoomService, SearchRoomsParams } from './interfaces';
import { HotelRoom, HotelRoomDocument } from './schemas/HotelRoom.schema';

@Injectable()
export class HotelRoomsService implements HotelRoomService {
    constructor(
        @InjectModel(HotelRoom.name) private readonly HotelRoomModel: Model<HotelRoomDocument>,
        @InjectConnection() private connection: Connection
    ) { }
    async create(data: Partial<HotelRoom>): Promise<HotelRoom> {
        throw new Error('Method not implemented.');
    }
    async findById(id: ID, isEnabled?: true): Promise<HotelRoom> {
        throw new Error('Method not implemented.');
    }
    async search(params: SearchRoomsParams): Promise<HotelRoom[]> {
        const { limit, offset, id } = params;
        try {
            const Rooms = await this.HotelRoomModel.find({

            })
        }


    }



    async update(id: ID, data: Partial<HotelRoom>): Promise<HotelRoom> {
        throw new Error('Method not implemented.');
    }
}
