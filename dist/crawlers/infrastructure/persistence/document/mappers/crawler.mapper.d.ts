import { CrawlerSchemaClass } from '../entities/crawler.schema';
import { Crawler } from '../../../../domain/crawler';
export declare class CrawlerMapper {
    static toDomain(raw: CrawlerSchemaClass): Crawler;
    static toPersistence(domainEntity: Crawler): CrawlerSchemaClass;
}
