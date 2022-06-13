import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../../user/user.service';
import { UserDto } from '@nest-commerce/data';
import { JwtPayload } from './jwt-payload';

export const JWT_SECRET_KEY = 'JWT_SECRET_KEY';
export const JWT_EXPIRATION_KEY = 'JWT_EXPIRATION';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private userService: UserService,
    private configService: ConfigService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.getOrThrow<string>(JWT_SECRET_KEY),
    });
  }

  async validate({ username }: JwtPayload): Promise<UserDto> {
    const user = this.userService.findUser({
      username,
    });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
