import { Injectable } from '@nestjs/common';
import { ID } from '../id.type';
import { IUserService, SearchUserParams } from './interfaces';
import { User } from './schemas/user.schema';

@Injectable()
export class UsersService implements IUserService {
  create(data: Partial<User>): Promise<User> {
    throw new Error('Method not implemented.');
  }
  findById(id: ID): Promise<User> {
    throw new Error('Method not implemented.');
  }
  findByEmail(email: string): Promise<User> {
    throw new Error('Method not implemented.');
  }
  findAll(params: SearchUserParams): Promise<User[]> {
    throw new Error('Method not implemented.');
  }
}
