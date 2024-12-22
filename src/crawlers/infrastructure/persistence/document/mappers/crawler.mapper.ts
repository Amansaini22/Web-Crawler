import { CrawlerSchemaClass } from '../entities/crawler.schema';
import { Crawler } from '../../../../domain/crawler';
import { Types } from 'mongoose';

export class CrawlerMapper {
  static toDomain(raw: CrawlerSchemaClass): Crawler {
    const domainEntity = new Crawler();

    domainEntity.domain = raw.domain;
    domainEntity.id = raw._id.toString(),
    domainEntity.discoveredUrls = raw.discoveredUrls;
    domainEntity.isActive = raw.isActive;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;
    domainEntity.deletedAt = raw.deletedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: Crawler): CrawlerSchemaClass {
    const persistenceSchema = new CrawlerSchemaClass();
    persistenceSchema.domain = domainEntity.domain;
    persistenceSchema.discoveredUrls = domainEntity.discoveredUrls;
    persistenceSchema.isActive = domainEntity.isActive;
    persistenceSchema.createdAt = domainEntity.createdAt;
    persistenceSchema.updatedAt = domainEntity.updatedAt;
    persistenceSchema.deletedAt = domainEntity.deletedAt;

    return persistenceSchema;
  }
}
