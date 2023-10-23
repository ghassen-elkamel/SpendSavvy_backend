import { ApiProperty } from "@nestjs/swagger";
import { IsString,IsNotEmpty } from "class-validator";

export class ResetPasswordDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    password: string
}   