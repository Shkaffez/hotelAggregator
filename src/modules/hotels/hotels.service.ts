import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { ID } from '../id.type';
import { IHotelService, SearchHotelsParams } from './interfaces';
import { Hotel, HotelDocument } from './schemas/hotel.schema';
import * as mongoose from 'mongoose';

@Injectable()
export class HotelsService implements IHotelService {
  constructor(
    @InjectModel(Hotel.name) private readonly HotelModel: Model<HotelDocument>,
    @InjectConnection() private connection: Connection
  ) { }

  async create(data: any): Promise<Hotel> {
    const { title, description } = data;
    // const _id = new mongoose.Types.ObjectId();
    const newHotel = new this.HotelModel({
      title, description
    });
    try {
      await newHotel.save();
      return await this.HotelModel.findById({ _id: newHotel._id }).select('_id title description');
    } catch (e) {
      console.log(e);
    }
  }

  async findById(id: ID): Promise<Hotel> {
    throw new Error('Method not implemented.');
  }

  async search(params: SearchHotelsParams): Promise<Hotel[]> {
    const { limit, offset } = params;
    try {
      return await this.HotelModel.find().skip(offset).limit(limit).select('_id title description');
    } catch (e) {
      console.log(e);
    }
  }
}