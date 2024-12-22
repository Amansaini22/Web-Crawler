import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { Crawler } from '../../domain/crawler';
import { FilterCrawlerDto, SortCrawlerDto } from '../../dto/query-crawler.dto';
export declare abstract class CrawlerRepository {
    abstract create(data: Omit<Crawler, 'id' | 'createdAt' | 'deletedAt' | 'updatedAt'>): Promise<Crawler>;
    abstract findManyWithPagination({ filterOptions, sortOptions, paginationOptions, }: {
        filterOptions?: FilterCrawlerDto | null;
        sortOptions?: SortCrawlerDto[] | null;
        paginationOptions: IPaginationOptions;
    }): Promise<Crawler[]>;
    abstract findById(id: Crawler['id']): Promise<NullableType<Crawler>>;
    abstract findByIds(ids: Crawler['id'][]): Promise<Crawler[]>;
    abstract findOne(query: FilterCrawlerDto): Promise<Crawler>;
    abstract update(id: Crawler['id'], payload: DeepPartial<Crawler>): Promise<Crawler | null>;
    abstract remove(id: Crawler['id']): Promise<void>;
    abstract activate(id: Crawler['id']): Promise<Crawler | null>;
    abstract deactivate(id: Crawler['id']): Promise<Crawler | null>;
}
