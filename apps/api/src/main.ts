/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import {
  ClassSerializerInterceptor,
  INestApplication,
  Logger,
  ValidationPipe,
} from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { PrismaService } from 'nestjs-prisma';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const PATH_KEY = 'PORT';
export const API_GLOBAL_PREFIX = 'api';

async function initPrisma(app: INestApplication) {
  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);
}

async function initGlobalConfigs(app: INestApplication) {
  app.setGlobalPrefix(API_GLOBAL_PREFIX);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    })
  );
  // TODO: Add excludeExtraneousValues after https://github.com/typestack/class-transformer/issues/740 is fixed
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
}

async function initSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Nest Commerce API')
    .setDescription('Nest Commerce API')
    .setVersion('0.0.1')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(`${API_GLOBAL_PREFIX}/swagger`, app, document);
}

async function startApp(app: INestApplication) {
  const configService = app.get(ConfigService);
  const port = configService.get(PATH_KEY) || 3000;

  await app.listen(port);
  Logger.log(`🚀 Application is running on: http://localhost:${port}/`);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await Promise.all([
    initPrisma(app),
    initGlobalConfigs(app),
    initSwagger(app),
  ]);
  await startApp(app);
}

bootstrap();
