import { Injectable, Logger } from '@nestjs/common';
import { NullableType } from '../utils/types/nullable.type';
import { CrawlerRepository } from './infrastructure/persistence/crawler.repository';
import { Crawler } from './domain/crawler';
import { CreateCrawlerDto } from './dto/create-crawler.dto';
import { UpdateCrawlerDto } from './dto/update-crawler.dto';
import {
  FilterCrawlerDto,
  SortCrawlerDto,
  QueryCrawlerDto,
} from './dto/query-crawler.dto';
import { IPaginationOptions } from '../utils/types/pagination-options';

@Injectable()
export class CrawlerService {
  private readonly logger = new Logger(CrawlerService.name);

  constructor(private readonly crawlerRepository: CrawlerRepository) {}

  async create(createCrawlerDto: CreateCrawlerDto): Promise<Crawler> {
    return this.crawlerRepository.create(createCrawlerDto);
  }

  async discoverProductUrls(domains: string[]): Promise<{ domain: string; urls: string[] }[]> {
    this.logger.log(`Starting crawl for domains: ${domains.join(', ')}`);
  
    const puppeteer = require('puppeteer-extra');
    const StealthPlugin = require('puppeteer-extra-plugin-stealth');
    puppeteer.use(StealthPlugin());
  
    const userAgents = [
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    ];
  
    const browser = await puppeteer.launch({ headless: true });
    const results: { domain: string; urls: string[] }[] = [];
  
    try {
      for (const domain of domains) {
        const page = await browser.newPage();
        const userAgent = userAgents[Math.floor(Math.random() * userAgents.length)];
        await page.setUserAgent(userAgent);
  
        this.logger.log(`Crawling domain: ${domain}`);
        try {
          await page.goto(`https://${domain}`, { waitUntil: 'networkidle2' });
  
          await this.scrollToLoadMore(page);
  
          const urls = await page.evaluate((): string[] => {
            const links = Array.from(document.querySelectorAll('a'));
            return links
            .map((link) => (link as HTMLAnchorElement).href)
            .filter(
              (url) =>
                url.includes('/product/') || url.includes('/item/') || url.includes('/p/') ||
                url.includes('/shop/') || url.includes('/buy/'),
            );
          });
  
          const uniqueUrls: string[] = Array.from(new Set(urls));
  
          this.logger.log(`Discovered ${uniqueUrls.length} product URLs on ${domain}`);
  
          const existingEntry = await this.crawlerRepository.findOne({ domain: domain });
          console.log('Existing Entry:', existingEntry);
          if (existingEntry) {
            const allUrls = Array.from(new Set([...existingEntry.discoveredUrls, ...uniqueUrls]));
            await this.crawlerRepository.update(existingEntry.id.toString(), { discoveredUrls: allUrls });
            this.logger.log(`Updated domain: ${domain} with ${allUrls.length} total URLs`);
          } else {
            await this.crawlerRepository.create({
              domain,
              discoveredUrls: uniqueUrls,
              isActive: true,
            });
            this.logger.log(`Created new entry for domain: ${domain}`);
          }
  
          results.push({ domain, urls: uniqueUrls });
  
          await this.getRandomDelay(2000, 5000);
        } catch (error) {
          this.logger.error(`Error crawling domain: ${domain}`, error.stack);
        } finally {
          await page.close();
        }
      }
    } catch (error) {
      this.logger.error('Error during the crawling process', error.stack);
      throw error;
    } finally {
      await browser.close();
    }
  
    return results;
  }
  
  private async scrollToLoadMore(page: any): Promise<void> {
    await page.evaluate(async () => {
      let totalHeight = 0;
      const distance = 200;
      while (totalHeight < document.body.scrollHeight) {
        window.scrollBy(0, distance);
        totalHeight += distance;
        await new Promise((resolve) => setTimeout(resolve, 300));
      }
    });
  }
  
  private async getRandomDelay(min: number, max: number): Promise<void> {
    const delay = Math.random() * (max - min) + min;
    return new Promise((resolve) => setTimeout(resolve, delay));
  }

  findManyWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterCrawlerDto | null;
    sortOptions?: SortCrawlerDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<Crawler[]> {
    return this.crawlerRepository.findManyWithPagination({
      filterOptions,
      sortOptions,
      paginationOptions,
    });
  }

  findById(id: Crawler['id']): Promise<NullableType<Crawler>> {
    return this.crawlerRepository.findById(id);
  }

  findByIds(ids: Crawler['id'][]): Promise<Crawler[]> {
    return this.crawlerRepository.findByIds(ids);
  }

  async update(
    id: Crawler['id'],
    updateCrawlerDto: UpdateCrawlerDto,
  ): Promise<Crawler | null> {
    return this.crawlerRepository.update(id, updateCrawlerDto);
  }

  async remove(id: Crawler['id']): Promise<void> {
    await this.crawlerRepository.remove(id);
  }

  async activate(id: Crawler['id']): Promise<Crawler | null> {
    return this.crawlerRepository.activate(id);
  }

  async deactivate(id: Crawler['id']): Promise<Crawler | null> {
    return this.crawlerRepository.deactivate(id);
  }
}
