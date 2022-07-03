import { Module, Provider } from '@nestjs/common';
import {
  CONFIG_KEY_MEILI_URL,
  MeiliSearchService,
} from './meili/meili-search.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DbSearchService } from './db/db-search.service';
import { PrismaModule, PrismaService } from 'nestjs-prisma';

const searchServiceFactory: Provider = {
  provide: 'ISearchService',
  useFactory: (configService: ConfigService, prismaService: PrismaService) => {
    const meiliHost = configService.get(CONFIG_KEY_MEILI_URL);
    return meiliHost
      ? new MeiliSearchService(configService)
      : new DbSearchService(prismaService);
  },
  inject: [ConfigService, PrismaService],
};

@Module({
  imports: [ConfigModule, PrismaModule],
  providers: [searchServiceFactory],
  exports: [searchServiceFactory],
})
export class SearchModule {}
