import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { PrismaModule } from 'nestjs-prisma';
import { SearchModule } from '../search/search.module';

@Module({
  imports: [PrismaModule, SearchModule],
  providers: [ProductService],
  controllers: [ProductController],
})
export class ProductModule {}
