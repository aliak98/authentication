import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ required: true, unique: true })
  phone: string;

  @Prop()
  otp: string;

  @Prop()
  otpExpiry: Date;

  @Prop({ default: false })
  verified: boolean;

  @Prop({ default: 0 })
  otpAttempts: number;

  @Prop()
  lastOtpAttempt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
