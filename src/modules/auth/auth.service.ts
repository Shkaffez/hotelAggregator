import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { InjectConnection } from '@nestjs/mongoose';
import { authUserDto } from './dto/authUser.dto';
import * as bcript from 'bcrypt';
import { User, UserDocument } from '../users/schemas/user.schema';
import * as mongoose from 'mongoose';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly UserModel: Model<UserDocument>,
    @InjectConnection() private connection: Connection,
  ) { }

  public async signup(data: Partial<User>): Promise<Partial<User>> {
    const _id = new mongoose.Types.ObjectId();
    const { email, passwordHash, name, contactPhone } = data;
    const newUser = new this.UserModel({
      _id,
      email,
      passwordHash,
      name,
      contactPhone
    });
    await newUser.save();
    return { _id, email, name }
  }

  public async validateUserforLocal(authUserData: authUserDto): Promise<any> {
    const { email, password } = authUserData;

    try {
      const user = await (await this.UserModel.findOne({ email: email })).toObject();
      if (user && bcript.compareSync(password, user.passwordHash)) {
        const { passwordHash, ...result } = user;
        return result;
      }
      return null;
    } catch (e) {
      console.log(e);
    }
  }
}
