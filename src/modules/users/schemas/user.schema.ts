import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ID } from 'src/modules/id.type';
import { Role } from 'src/utils/role.enum';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  _id: ID;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  passwordHash: string;

  @Prop({ required: true, unique: true })
  name: string;

  @Prop()
  contactPhone: string;

  @Prop({ default: 'client' })
  role: Role;
}

export const UserSchema = SchemaFactory.createForClass(User);
