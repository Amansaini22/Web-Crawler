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
exports.Crawler = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class Crawler {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Unique identifier for the crawler',
        example: '6498e7f2f85a3c00128d9b35',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Crawler.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Domain being crawled',
        example: 'example.com',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Crawler.prototype, "domain", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'List of discovered product URLs',
        example: ['https://example.com/product/123', 'https://example.com/item/456'],
        type: [String],
    }),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], Crawler.prototype, "discoveredUrls", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Indicates whether the crawler is active',
        example: true,
    }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], Crawler.prototype, "isActive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Timestamp when the crawler was created',
        example: '2023-08-15T12:34:56.789Z',
    }),
    __metadata("design:type", Date)
], Crawler.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Timestamp when the crawler was last updated',
        example: '2023-08-16T14:21:00.123Z',
    }),
    __metadata("design:type", Date)
], Crawler.prototype, "updatedAt", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Timestamp when the crawler was deleted',
        example: null,
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], Crawler.prototype, "deletedAt", void 0);
exports.Crawler = Crawler;
//# sourceMappingURL=crawler.js.map