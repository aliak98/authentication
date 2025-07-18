import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class VerifyOtpDto {
  @ApiProperty({
    type: String,
  })
  @IsString()
  @Length(10, 15)
  phone: string;

  @ApiProperty({
    type: String,
  })
  @IsString()
  @Length(6, 6)
  otp: string;
}
