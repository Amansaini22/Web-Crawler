"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrawlerDocumentRepository = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const crawler_schema_1 = require("../entities/crawler.schema");
const crawler_mapper_1 = require("../mappers/crawler.mapper");
let CrawlerDocumentRepository = class CrawlerDocumentRepository {
    constructor(crawlerModel) {
        this.crawlerModel = crawlerModel;
    }
    async create(data) {
        const persistenceModel = crawler_mapper_1.CrawlerMapper.toPersistence(data);
        const createdCrawler = new this.crawlerModel(persistenceModel);
        const crawlerObject = await createdCrawler.save();
        return crawler_mapper_1.CrawlerMapper.toDomain(crawlerObject);
    }
    async findManyWithPagination({ filterOptions, sortOptions, paginationOptions, }) {
        const where = {};
        if (filterOptions?.domain) {
            where['domain'] = filterOptions.domain;
        }
        if (filterOptions?.isActive !== undefined) {
            where['isActive'] = filterOptions.isActive;
        }
        const crawlerObjects = await this.crawlerModel
            .find(where)
            .sort(sortOptions?.reduce((accumulator, sort) => ({
            ...accumulator,
            [sort.orderBy === 'id' ? '_id' : sort.orderBy]: sort.order.toUpperCase() === 'ASC' ? 1 : -1,
        }), {}))
            .skip((paginationOptions.page - 1) * paginationOptions.limit)
            .limit(paginationOptions.limit);
        return crawlerObjects.map((crawlerObject) => crawler_mapper_1.CrawlerMapper.toDomain(crawlerObject));
    }
    async findById(id) {
        const crawlerObject = await this.crawlerModel.findById(id);
        return crawlerObject ? crawler_mapper_1.CrawlerMapper.toDomain(crawlerObject) : null;
    }
    async findOne(query) {
        const crawlerObject = await this.crawlerModel.findOne(query);
        return crawlerObject ? crawler_mapper_1.CrawlerMapper.toDomain(crawlerObject) : null;
    }
    async findByIds(ids) {
        const crawlerObjects = await this.crawlerModel.find({
            _id: { $in: ids },
        });
        return crawlerObjects.map((crawlerObject) => crawler_mapper_1.CrawlerMapper.toDomain(crawlerObject));
    }
    async update(id, payload) {
        if (!mongoose_2.Types.ObjectId.isValid(id)) {
            throw new Error('Invalid ID format');
        }
        const filter = { _id: new mongoose_2.Types.ObjectId(id) };
        const existingCrawler = await this.crawlerModel.findOne(filter);
        if (!existingCrawler) {
            return null;
        }
        const updatedPayload = {
            ...crawler_mapper_1.CrawlerMapper.toDomain(existingCrawler),
            ...payload,
        };
        const updatedCrawler = await this.crawlerModel.findOneAndUpdate(filter, crawler_mapper_1.CrawlerMapper.toPersistence(updatedPayload), { new: true });
        return updatedCrawler ? crawler_mapper_1.CrawlerMapper.toDomain(updatedCrawler) : null;
    }
    async remove(id) {
        await this.crawlerModel.deleteOne({
            _id: id.toString(),
        });
    }
    async activate(id) {
        const crawlerObject = await this.crawlerModel.findOneAndUpdate({ _id: id.toString() }, { isActive: true }, { new: true });
        return crawlerObject ? crawler_mapper_1.CrawlerMapper.toDomain(crawlerObject) : null;
    }
    async deactivate(id) {
        const crawlerObject = await this.crawlerModel.findOneAndUpdate({ _id: id.toString() }, { isActive: false }, { new: true });
        return crawlerObject ? crawler_mapper_1.CrawlerMapper.toDomain(crawlerObject) : null;
    }
};
CrawlerDocumentRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(crawler_schema_1.CrawlerSchemaClass.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], CrawlerDocumentRepository);
exports.CrawlerDocumentRepository = CrawlerDocumentRepository;
//# sourceMappingURL=crawler.repository.js.map