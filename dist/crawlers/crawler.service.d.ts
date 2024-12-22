import { NullableType } from '../utils/types/nullable.type';
import { CrawlerRepository } from './infrastructure/persistence/crawler.repository';
import { Crawler } from './domain/crawler';
import { CreateCrawlerDto } from './dto/create-crawler.dto';
import { UpdateCrawlerDto } from './dto/update-crawler.dto';
import { FilterCrawlerDto, SortCrawlerDto } from './dto/query-crawler.dto';
import { IPaginationOptions } from '../utils/types/pagination-options';
export declare class CrawlerService {
    private readonly crawlerRepository;
    private readonly logger;
    constructor(crawlerRepository: CrawlerRepository);
    create(createCrawlerDto: CreateCrawlerDto): Promise<Crawler>;
    private getRandomUserAgent;
    private retryWithBackoff;
    discoverProductUrls(domains: string[]): Promise<{
        domain: string;
        urls: string[];
    }[]>;
    private scrollToLoadMore;
    findManyWithPagination({ filterOptions, sortOptions, paginationOptions, }: {
        filterOptions?: FilterCrawlerDto | null;
        sortOptions?: SortCrawlerDto[] | null;
        paginationOptions: IPaginationOptions;
    }): Promise<Crawler[]>;
    findById(id: Crawler['id']): Promise<NullableType<Crawler>>;
    findByIds(ids: Crawler['id'][]): Promise<Crawler[]>;
    update(id: Crawler['id'], updateCrawlerDto: UpdateCrawlerDto): Promise<Crawler | null>;
    remove(id: Crawler['id']): Promise<void>;
    activate(id: Crawler['id']): Promise<Crawler | null>;
    deactivate(id: Crawler['id']): Promise<Crawler | null>;
}
