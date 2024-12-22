import mongoose, { HydratedDocument, Types } from 'mongoose';
export type CrawlerDocument = HydratedDocument<CrawlerSchemaClass>;
export declare class CrawlerSchemaClass {
    _id: Types.ObjectId;
    domain: string;
    discoveredUrls: string[];
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
}
export declare const CrawlerSchema: mongoose.Schema<CrawlerSchemaClass, mongoose.Model<CrawlerSchemaClass, any, any, any, mongoose.Document<unknown, any, CrawlerSchemaClass> & CrawlerSchemaClass & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, CrawlerSchemaClass, mongoose.Document<unknown, {}, mongoose.FlatRecord<CrawlerSchemaClass>> & mongoose.FlatRecord<CrawlerSchemaClass> & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}>;
