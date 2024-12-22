import { Crawler } from '../domain/crawler';
export declare class FilterCrawlerDto {
    domain?: string;
    isActive?: boolean;
}
export declare class SortCrawlerDto {
    orderBy: keyof Crawler;
    order: 'ASC' | 'DESC';
}
export declare class QueryCrawlerDto {
    page?: number;
    limit?: number;
    filters?: FilterCrawlerDto | null;
    sort?: SortCrawlerDto[] | null;
}
