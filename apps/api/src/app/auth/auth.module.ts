import { forwardRef, Module } from '@nestjs/common';
import { PasswordService } from './password/password.service';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import {
  JWT_EXPIRATION_KEY,
  JWT_SECRET_KEY,
  JwtStrategy,
} from './jwt/jwt.strategy';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.getOrThrow<string>(JWT_SECRET_KEY),
        signOptions: {
          expiresIn: configService.getOrThrow(JWT_EXPIRATION_KEY),
        },
      }),
    }),
    forwardRef(() => UserModule),
    ConfigModule,
  ],
  providers: [PasswordService, AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [PasswordService],
})
export class AuthModule {}
