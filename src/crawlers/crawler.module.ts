import { Module } from '@nestjs/common';
import { CrawlerService } from './crawler.service';
import { CrawlerController } from './crawler.controller';
import { DocumentCrawlerPersistenceModule } from './infrastructure/persistence/document/document-persistence.module';


// <database-block>
const infrastructurePersistenceModule = DocumentCrawlerPersistenceModule;
// </database-block>

@Module({
  imports: [infrastructurePersistenceModule],
  controllers: [CrawlerController],
  providers: [CrawlerService],
  exports: [CrawlerService, infrastructurePersistenceModule],
})
export class CrawlerModule {}
