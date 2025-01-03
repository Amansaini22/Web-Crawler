import { ConfigService } from '@nestjs/config';
import { MongooseModuleOptions, MongooseOptionsFactory } from '@nestjs/mongoose';
import { AllConfigType } from '../config/config.type';
export declare class MongooseConfigService implements MongooseOptionsFactory {
    private configService;
    constructor(configService: ConfigService<AllConfigType>);
    createMongooseOptions(): MongooseModuleOptions;
}
