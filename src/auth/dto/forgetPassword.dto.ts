import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class forgetPasswordDto {
    @IsNotEmpty()
    @IsEmail()
    @ApiProperty()
    readonly mail:string
}