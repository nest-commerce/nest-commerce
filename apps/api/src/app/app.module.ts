import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { resolve } from 'path';
import { PrismaModule } from 'nestjs-prisma';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { API_GLOBAL_PREFIX } from '../main';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import { SearchModule } from './search/search.module';

const STATIC_ROOT_PATH_KEY = 'SERVE_STATIC_ROOT_PATH';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ServeStaticModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => [
        {
          rootPath: resolve(
            configService.getOrThrow<string>(STATIC_ROOT_PATH_KEY)
          ),
          exclude: [`/${API_GLOBAL_PREFIX}*`],
        },
      ],
    }),
    PrismaModule.forRoot(),
    UserModule,
    AuthModule,
    ProductModule,
    SearchModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
