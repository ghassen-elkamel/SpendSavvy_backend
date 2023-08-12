import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/common/strategy/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { AuthProvider } from './auth.provider';
import { RefreshStrategy } from 'src/common/strategy/refresh.strategy';
import { DatabaseModule } from 'src/common/database/database.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService,JwtStrategy, ...AuthProvider,RefreshStrategy],
  imports: [
    ConfigModule.forRoot(),
    PassportModule.register({ defaultStrategy: ['jwt','refresh'] }),
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,

    }),
    DatabaseModule,
  ],
  exports: [AuthService],
})

export class AuthModule {}
