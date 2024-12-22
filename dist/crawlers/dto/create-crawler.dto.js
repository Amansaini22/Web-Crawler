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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCrawlerDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateCrawlerDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, description: 'Domain to be crawled' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCrawlerDto.prototype, "domain", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        type: [String],
        description: 'List of initial URLs to crawl',
        example: ['https://example.com/product/1', 'https://example.com/product/2'],
    }),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], CreateCrawlerDto.prototype, "discoveredUrls", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: Number, description: 'Crawl depth', example: 3 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], CreateCrawlerDto.prototype, "crawlDepth", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        type: Object,
        description: 'Rate limit settings',
        example: { min: 1, max: 10 },
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], CreateCrawlerDto.prototype, "rateLimit", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        type: Boolean,
        description: 'Whether the crawler is active',
        example: true,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateCrawlerDto.prototype, "isActive", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        type: Object,
        description: 'Proxy settings',
        example: { host: 'proxy.example.com', port: 8080 },
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], CreateCrawlerDto.prototype, "proxy", void 0);
exports.CreateCrawlerDto = CreateCrawlerDto;
//# sourceMappingURL=create-crawler.dto.js.map