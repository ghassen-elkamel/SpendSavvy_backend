import { ApiProperty } from '@nestjs/swagger';
import {IsBoolean, IsEmail, IsNotEmpty,IsOptional, IsString } from 'class-validator';
export class CreateUserDto {

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  readonly mail: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly password: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly userName: string;
  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly avatar: string;

}