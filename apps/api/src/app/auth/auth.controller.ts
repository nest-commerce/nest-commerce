import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResultDto, CredentialsDto } from '@nest-commerce/data';
import { ApiOkResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOkResponse({ type: AuthResultDto })
  @ApiUnauthorizedResponse()
  @Post('login')
  async login(@Body() body: CredentialsDto): Promise<AuthResultDto> {
    return this.authService.login(body);
  }
}
