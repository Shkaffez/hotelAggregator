import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ID } from 'src/modules/id.type';

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
  role: 'admin' | 'manager' | 'client';
}

export const BookSchema = SchemaFactory.createForClass(User);
