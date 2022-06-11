import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { resolve } from 'path';
import { PrismaModule } from 'nestjs-prisma';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GLOBAL_PREFIX } from '../main';

const STATIC_ROOT_PATH_KEY = 'SERVE_STATIC_ROOT_PATH';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ServeStaticModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => [
        {
          rootPath: resolve(
            configService.getOrThrow<string>(STATIC_ROOT_PATH_KEY)
          ),
          exclude: [`/${GLOBAL_PREFIX}*`],
        },
      ],
    }),
    PrismaModule.forRoot({ isGlobal: true }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
