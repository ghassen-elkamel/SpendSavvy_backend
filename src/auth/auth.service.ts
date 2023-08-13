import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt'
import { Model } from 'mongoose';
import { ACCESS_TOKEN_TIMEOUT, REFRESH_TOKEN_TIMEOUT, USER_PROVIDER } from 'src/config';
import { User } from 'src/model/user.model';

@Injectable()
export class AuthService {
    constructor(
        @Inject(USER_PROVIDER) private readonly userModel: Model<User>,
        private readonly jwtService: JwtService,

    ) {}

    async getUserByMail(mail: string) {
        return this.userModel.findOne(
          { mail },
          { id: 1, password: 1, userName:1,mail:1,avatar:1},
        );
      }
async hashPassword(password: string) :Promise<string> {
   return bcrypt.hash(password, 10);
}
async decodePassword(user: User, password: string) :Promise<boolean> {
    let match=false;
 
    
    console.log(user)
    match=user&& (await bcrypt.compare(password, user.password));
    return match;
}
async generateToken(user: User) {
    const payload = {
        mail: user.mail,
        userId: user._id,
        refresh: true,
    };
  const accessToken :string=this.jwtService.sign(payload, {
    expiresIn:ACCESS_TOKEN_TIMEOUT,
});
const refreshToken :string=this.jwtService.sign({
    ...payload,refresh:true}, {
    expiresIn:REFRESH_TOKEN_TIMEOUT,
});
return { accessToken, refreshToken };
}

async createUser(mail: string, password: string, userName: string, avatar: string) {
    const user = new this.userModel({ mail, password, userName, avatar });
    return user.save();

}

}
