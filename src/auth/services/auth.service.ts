import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/schema/user.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async requestOtp(user: User) {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = new Date(Date.now() + 10 * 60000); // 10 minutes

    user.otp = otp;
    user.otpExpiry = otpExpiry;
    user.otpAttempts = user.otpAttempts + 1;
    user.lastOtpAttempt = new Date();
    await user.save();

    console.log(`OTP for ${user.phone}: ${otp}`); // Replace with SMS or Email service
    return { message: 'OTP sent successfully' };
  }

  async verifyOtp(phone: string, otp: string) {
    const user = await this.userModel.findOne({ phone });
    if (!user || user.otp !== otp || user.otpExpiry < new Date()) {
      throw new BadRequestException('Invalid OTP');
    }

    user.verified = true;
    await user.save();

    const tokenPayload = { sub: user._id, phone: user.phone };

    return {
      message: 'OTP verified successfully',
      token: this.jwtService.sign(tokenPayload),
    };
  }

  async register(phone: string) {
    let user = await this.userModel.findOne({ phone });

    if (!user) {
      user = await this.userModel.create({
        phone,
      });
    }

    if (user.lastOtpAttempt && user.otpAttempts >= 3) {
      const timeSinceLastAttempt = Date.now() - user.lastOtpAttempt.getTime();

      // for one hour
      if (timeSinceLastAttempt < 60 * 60 * 1000) {
        throw new BadRequestException(
          'Too many OTP requests. Try again later.',
        );
      } else {
        // Reset counter if last attempt was >1 hour ago
        user.otpAttempts = 0;
      }
    }

    await this.requestOtp(user);
    return { phone: user.phone, _id: user._id };
  }

  async validateUser(phone: string): Promise<User> {
    const user = await this.userModel.findOne({ phone, verified: true });

    if (!user) {
      return null;
    }
  }
}
