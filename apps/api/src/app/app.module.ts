import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { resolve } from 'path';
import { PrismaModule } from 'nestjs-prisma';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: resolve(process.env.SERVE_STATIC_ROOT_PATH),
      exclude: ['/api*'],
    }),
    PrismaModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
