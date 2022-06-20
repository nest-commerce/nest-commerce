import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { AuthResultDto, CredentialsDto } from '@nest-commerce/data';

const ERROR_INVALID_CREDENTIALS = 'The passed credentials are incorrect';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async login({ username, password }: CredentialsDto): Promise<AuthResultDto> {
    const user = await this.userService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException(ERROR_INVALID_CREDENTIALS);
    }
    return {
      accessToken: this.jwtService.sign({
        username: user.username,
        role: user.role,
      }),
      role: user.role,
    };
  }
}
