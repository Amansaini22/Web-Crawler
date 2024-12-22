import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  CrawlerSchema,
  CrawlerSchemaClass,
} from './entities/crawler.schema';
import { CrawlerRepository } from '../crawler.repository';
import { CrawlerDocumentRepository } from './repositories/crawler.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CrawlerSchemaClass.name, schema: CrawlerSchema },
    ]),
  ],
  providers: [
    {
      provide: CrawlerRepository,
      useClass: CrawlerDocumentRepository,
    },
  ],
  exports: [CrawlerRepository],
})
export class DocumentCrawlerPersistenceModule {}
