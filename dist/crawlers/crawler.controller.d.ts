import { CrawlerService } from './crawler.service';
import { CreateCrawlerDto } from './dto/create-crawler.dto';
import { UpdateCrawlerDto } from './dto/update-crawler.dto';
import { Crawler } from './domain/crawler';
import { NullableType } from '@src/utils/types/nullable.type';
export declare class CrawlerController {
    private readonly crawlerService;
    constructor(crawlerService: CrawlerService);
    discover(domains: string[]): Promise<{
        domain: string;
        urls: string[];
    }[]>;
    createCrawler(createCrawlerDto: CreateCrawlerDto): Promise<Crawler>;
    findById(id: string): Promise<NullableType<Crawler>>;
    updateCrawler(id: string, updateCrawlerDto: UpdateCrawlerDto): Promise<Crawler | null>;
    deleteCrawler(id: string): Promise<void>;
    activateCrawler(id: string): Promise<NullableType<Crawler>>;
    deactivateCrawler(id: string): Promise<NullableType<Crawler>>;
}
