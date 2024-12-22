"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrawlerMapper = void 0;
const crawler_schema_1 = require("../entities/crawler.schema");
const crawler_1 = require("../../../../domain/crawler");
class CrawlerMapper {
    static toDomain(raw) {
        const domainEntity = new crawler_1.Crawler();
        domainEntity.domain = raw.domain;
        domainEntity.id = raw._id.toString(),
            domainEntity.discoveredUrls = raw.discoveredUrls;
        domainEntity.isActive = raw.isActive;
        domainEntity.createdAt = raw.createdAt;
        domainEntity.updatedAt = raw.updatedAt;
        domainEntity.deletedAt = raw.deletedAt;
        return domainEntity;
    }
    static toPersistence(domainEntity) {
        const persistenceSchema = new crawler_schema_1.CrawlerSchemaClass();
        persistenceSchema.domain = domainEntity.domain;
        persistenceSchema.discoveredUrls = domainEntity.discoveredUrls;
        persistenceSchema.isActive = domainEntity.isActive;
        persistenceSchema.createdAt = domainEntity.createdAt;
        persistenceSchema.updatedAt = domainEntity.updatedAt;
        persistenceSchema.deletedAt = domainEntity.deletedAt;
        return persistenceSchema;
    }
}
exports.CrawlerMapper = CrawlerMapper;
//# sourceMappingURL=crawler.mapper.js.map