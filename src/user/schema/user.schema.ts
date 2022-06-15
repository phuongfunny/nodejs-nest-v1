import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UsersDocument = Users & Document;

@Schema()
export class Users {
  @Prop({ require: true, unique: true })
  username: string;

  @Prop({ require: true })
  password: string;

  @Prop()
  first_name: string;

  @Prop()
  last_name: string;

  // @Prop()
  // age: string;

  // @Prop()
  // address: string;
}

export const UsersSchema = SchemaFactory.createForClass(Users);
