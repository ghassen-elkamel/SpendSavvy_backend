import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  readonly mail: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly password: string;



}
