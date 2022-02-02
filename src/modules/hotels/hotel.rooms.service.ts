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
    try {
      const room = await this.HotelRoomModel.findById({ _id: id }).populate({
        path: 'Hotel',
        select: '_id title description'
      }).select('_id description images hotel').exec();
      return room;
    } catch (e) {
      console.log(e);
    }
  }

  async search(params: SearchRoomsParams): Promise<HotelRoom[]> {
    const { limit, offset, id } = params;
    try {
      const rooms = await this.HotelRoomModel.find({ hotel: id }).populate({
        path: 'Hotel',
        select: '_id title'
      }).skip(offset).limit(limit).select('_id description images hotel').exec();
      return rooms;
    } catch (e) {
      console.log(e);
    }
  }



  async update(id: ID, data: Partial<HotelRoom>): Promise<HotelRoom> {
    throw new Error('Method not implemented.');
  }
}
