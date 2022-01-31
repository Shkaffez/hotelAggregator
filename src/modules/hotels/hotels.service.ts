import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { ID } from '../id.type';
import { IHotelService } from './interfaces';
import { Hotel, HotelDocument } from './schemas/hotel.schema';
import { HotelRoom, HotelRoomDocument } from './schemas/HotelRoom.schema';

@Injectable()
export class HotelsService implements IHotelService {
  constructor(
    @InjectModel(Hotel.name) private readonly HotelModel: Model<HotelDocument>,
    @InjectConnection() private connection: Connection
  ) { }

  create(data: any): Promise<Hotel> {
    throw new Error('Method not implemented.');
  }
  findById(id: ID): Promise<Hotel> {
    throw new Error('Method not implemented.');
  }
  search(params: Pick<Hotel, 'title'>): Promise<Hotel[]> {
    throw new Error('Method not implemented.');
  }
}
