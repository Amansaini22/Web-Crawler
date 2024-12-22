"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const crawler_module_1 = require("./crawlers/crawler.module");
const config_1 = require("@nestjs/config");
const app_config_1 = require("./config/app.config");
const database_config_1 = require("./database/config/database.config");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_config_service_1 = require("./database/mongoose-config.service");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                load: [app_config_1.default, database_config_1.default],
                envFilePath: ['.env'],
            }),
            mongoose_1.MongooseModule.forRootAsync({
                useClass: mongoose_config_service_1.MongooseConfigService,
            }),
            crawler_module_1.CrawlerModule
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map