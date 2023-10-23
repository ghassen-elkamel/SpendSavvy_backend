import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from 'src/auth/auth.service';

import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET_KEY, // Use the correct environment variable
    })
  }
  async validate(payload) {
    const user = await this.authService.getUserByMail(payload.mail);
    if (!user || payload.refresh) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
