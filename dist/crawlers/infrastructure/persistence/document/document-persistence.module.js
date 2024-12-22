"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentCrawlerPersistenceModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const crawler_schema_1 = require("./entities/crawler.schema");
const crawler_repository_1 = require("../crawler.repository");
const crawler_repository_2 = require("./repositories/crawler.repository");
let DocumentCrawlerPersistenceModule = class DocumentCrawlerPersistenceModule {
};
DocumentCrawlerPersistenceModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: crawler_schema_1.CrawlerSchemaClass.name, schema: crawler_schema_1.CrawlerSchema },
            ]),
        ],
        providers: [
            {
                provide: crawler_repository_1.CrawlerRepository,
                useClass: crawler_repository_2.CrawlerDocumentRepository,
            },
        ],
        exports: [crawler_repository_1.CrawlerRepository],
    })
], DocumentCrawlerPersistenceModule);
exports.DocumentCrawlerPersistenceModule = DocumentCrawlerPersistenceModule;
//# sourceMappingURL=document-persistence.module.js.map