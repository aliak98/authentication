import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class RegisterDto {
  @ApiProperty({
    type: String,
  })
  @IsString()
  @Length(10, 15)
  phone: string;
}
