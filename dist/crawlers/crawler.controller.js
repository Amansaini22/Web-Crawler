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
exports.CrawlerController = void 0;
const common_1 = require("@nestjs/common");
const crawler_service_1 = require("./crawler.service");
const create_crawler_dto_1 = require("./dto/create-crawler.dto");
const update_crawler_dto_1 = require("./dto/update-crawler.dto");
const swagger_1 = require("@nestjs/swagger");
let CrawlerController = class CrawlerController {
    constructor(crawlerService) {
        this.crawlerService = crawlerService;
    }
    async discover(domains) {
        return this.crawlerService.discoverProductUrls(domains);
    }
    async createCrawler(createCrawlerDto) {
        return await this.crawlerService.create(createCrawlerDto);
    }
    async findById(id) {
        return this.crawlerService.findById(id);
    }
    async updateCrawler(id, updateCrawlerDto) {
        return this.crawlerService.update(id, updateCrawlerDto);
    }
    async deleteCrawler(id) {
        await this.crawlerService.remove(id);
    }
    async activateCrawler(id) {
        return this.crawlerService.activate(id);
    }
    async deactivateCrawler(id) {
        return this.crawlerService.deactivate(id);
    }
};
__decorate([
    (0, common_1.Post)('discover'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], CrawlerController.prototype, "discover", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_crawler_dto_1.CreateCrawlerDto]),
    __metadata("design:returntype", Promise)
], CrawlerController.prototype, "createCrawler", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CrawlerController.prototype, "findById", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_crawler_dto_1.UpdateCrawlerDto]),
    __metadata("design:returntype", Promise)
], CrawlerController.prototype, "updateCrawler", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CrawlerController.prototype, "deleteCrawler", null);
__decorate([
    (0, common_1.Patch)(':id/activate'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CrawlerController.prototype, "activateCrawler", null);
__decorate([
    (0, common_1.Patch)(':id/deactivate'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CrawlerController.prototype, "deactivateCrawler", null);
CrawlerController = __decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiTags)('Web Crawler'),
    (0, common_1.Controller)('crawler'),
    __metadata("design:paramtypes", [crawler_service_1.CrawlerService])
], CrawlerController);
exports.CrawlerController = CrawlerController;
//# sourceMappingURL=crawler.controller.js.map