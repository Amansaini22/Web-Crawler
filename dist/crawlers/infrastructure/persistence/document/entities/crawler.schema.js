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
exports.CrawlerSchema = exports.CrawlerSchemaClass = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const mongoose_3 = require("mongoose");
let CrawlerSchemaClass = class CrawlerSchemaClass {
};
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose_2.default.Schema.Types.ObjectId,
        auto: true,
    }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], CrawlerSchemaClass.prototype, "_id", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        required: true,
    }),
    __metadata("design:type", String)
], CrawlerSchemaClass.prototype, "domain", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: [String],
        required: true,
    }),
    __metadata("design:type", Array)
], CrawlerSchemaClass.prototype, "discoveredUrls", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Boolean,
        default: false,
    }),
    __metadata("design:type", Boolean)
], CrawlerSchemaClass.prototype, "isActive", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Date,
        default: mongoose_3.now,
    }),
    __metadata("design:type", Date)
], CrawlerSchemaClass.prototype, "createdAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Date,
        default: mongoose_3.now,
    }),
    __metadata("design:type", Date)
], CrawlerSchemaClass.prototype, "updatedAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Date,
        default: null,
    }),
    __metadata("design:type", Date)
], CrawlerSchemaClass.prototype, "deletedAt", void 0);
CrawlerSchemaClass = __decorate([
    (0, mongoose_1.Schema)({
        collection: 'crawlers',
        timestamps: true,
        toJSON: {
            virtuals: true,
            getters: true,
        },
    })
], CrawlerSchemaClass);
exports.CrawlerSchemaClass = CrawlerSchemaClass;
exports.CrawlerSchema = mongoose_1.SchemaFactory.createForClass(CrawlerSchemaClass);
exports.CrawlerSchema.index({ domain: 1 });
//# sourceMappingURL=crawler.schema.js.map