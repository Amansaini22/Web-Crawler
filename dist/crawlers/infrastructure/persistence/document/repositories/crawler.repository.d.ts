import { Model } from 'mongoose';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';
import { CrawlerRepository } from '../../crawler.repository';
import { Crawler } from '../../../../domain/crawler';
import { FilterCrawlerDto, SortCrawlerDto } from '../../../../dto/query-crawler.dto';
import { CrawlerSchemaClass } from '../entities/crawler.schema';
export declare class CrawlerDocumentRepository implements CrawlerRepository {
    private readonly crawlerModel;
    constructor(crawlerModel: Model<CrawlerSchemaClass>);
    create(data: Crawler): Promise<Crawler>;
    findManyWithPagination({ filterOptions, sortOptions, paginationOptions, }: {
        filterOptions?: FilterCrawlerDto | null;
        sortOptions?: SortCrawlerDto[] | null;
        paginationOptions: IPaginationOptions;
    }): Promise<Crawler[]>;
    findById(id: Crawler['id']): Promise<NullableType<Crawler>>;
    findOne(query: FilterCrawlerDto): Promise<NullableType<Crawler>>;
    findByIds(ids: Crawler['id'][]): Promise<Crawler[]>;
    update(id: Crawler['id'], payload: Partial<Crawler>): Promise<Crawler | null>;
    remove(id: Crawler['id']): Promise<void>;
    activate(id: Crawler['id']): Promise<Crawler | null>;
    deactivate(id: Crawler['id']): Promise<Crawler | null>;
}
