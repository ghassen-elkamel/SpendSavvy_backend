import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { openApiResponse } from 'src/common/decorator/openApi.decorator';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from './dto/createUser.dto';
@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor( private readonly authService: AuthService,) {}
    @Post('/login')
@openApiResponse(    { status: HttpStatus.OK, description: 'accessToken & refreshToken has been returned!' },
{ status: HttpStatus.UNAUTHORIZED, description: 'unothorized!' },
{ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'something went wrong!' }
)
public async login(@Res() res,@Body() loginDto: LoginDto) {
    const { mail, password } = loginDto;
    const user = await this.authService.getUserByMail(mail);
    if (!user) {
        return res.status(HttpStatus.UNAUTHORIZED).send({
            statusCode: HttpStatus.UNAUTHORIZED,
            message: "User not found,verify your email"
    });}
    const verifPassword=await this.authService.decodePassword(user,password);
    if (!verifPassword) {
        return res.status(HttpStatus.UNAUTHORIZED).send({
          statusCode: HttpStatus.UNAUTHORIZED,
          message: "password incorrect"
        })
      }
      const { accessToken, refreshToken } = await this.authService.generateToken(user);
        return res.status(HttpStatus.OK).send({
            statusCode: HttpStatus.OK,
            message: "login successfully",
            accessToken,
            refreshToken
        });

}
@Post('/register')
@openApiResponse(    { status: HttpStatus.OK, description: 'user has been created!' },
{ status: HttpStatus.UNAUTHORIZED, description: 'unothorized!' },
{ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'something went wrong!' }
)
public async register(@Res() res,@Body() createUserDto: CreateUserDto) {
    const { mail, password, userName, avatar } = createUserDto;
    const user = await this.authService.getUserByMail(mail);
    if (user) {
        return res.status(HttpStatus.UNAUTHORIZED).send({
            statusCode: HttpStatus.UNAUTHORIZED,
            message: "User already exists"
    });}
    const hashedPassword=await this.authService.hashPassword(password);
    const newUser=await this.authService.createUser(mail,hashedPassword,userName,avatar);
    if (!newUser) {
        return res.status(HttpStatus.UNAUTHORIZED).send({
          statusCode: HttpStatus.UNAUTHORIZED,
          message: "something went wrong"
        })
      }
        return res.status(HttpStatus.OK).send({
            statusCode: HttpStatus.OK,
            message: "user has been created",
            newUser
        });

      }
}