import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { PrismaModule } from 'nestjs-prisma';
import { PasswordService } from '../auth/password/password.service';
import { ConfigModule } from '@nestjs/config';
import { UserController } from './user.controller';

@Module({
  imports: [ConfigModule, PrismaModule],
  providers: [UserService, PasswordService],
  controllers: [UserController],
})
export class UserModule {}
