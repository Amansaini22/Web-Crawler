import { Injectable, Logger } from '@nestjs/common';
import { NullableType } from '../utils/types/nullable.type';
import { CrawlerRepository } from './infrastructure/persistence/crawler.repository';
import { Crawler } from './domain/crawler';
import { CreateCrawlerDto } from './dto/create-crawler.dto';
import { UpdateCrawlerDto } from './dto/update-crawler.dto';
import {
  FilterCrawlerDto,
  SortCrawlerDto,
} from './dto/query-crawler.dto';
import { IPaginationOptions } from '../utils/types/pagination-options';
import pLimit from 'p-limit';

@Injectable()
export class CrawlerService {
  private readonly logger = new Logger(CrawlerService.name);

  constructor(private readonly crawlerRepository: CrawlerRepository) {}

  async create(createCrawlerDto: CreateCrawlerDto): Promise<Crawler> {
    return this.crawlerRepository.create(createCrawlerDto);
  }

  private getRandomUserAgent(): string {
    const userAgents = [
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    ];
    return userAgents[Math.floor(Math.random() * userAgents.length)];
  }

  private retryWithBackoff = async (fn: () => Promise<any>, retries = 3, delay = 1000): Promise<any> => {
    let attempt = 0;
    while (attempt < retries) {
      try {
        return await fn();
      } catch (error) {
        attempt++;
        if (attempt >= retries) throw error;
        console.error(`Retrying... Attempt ${attempt}`);
        await new Promise((resolve) => setTimeout(resolve, delay * attempt)); // Exponential backoff
      }
    }
  };

  async discoverProductUrls(domains: string[]): Promise<{ domain: string; urls: string[] }[]> {
    const puppeteer = require('puppeteer-extra');
    const StealthPlugin = require('puppeteer-extra-plugin-stealth');
    puppeteer.use(StealthPlugin());
  
    const browser = await puppeteer.launch({ headless: true });
    const results: { domain: string; urls: string[] }[] = [];
    const limit = pLimit(5);
  
    try {
      await Promise.all(
        domains.map((domain) =>
          limit(async () => {
            const page = await browser.newPage();
            const userAgent = this.getRandomUserAgent();
            await page.setUserAgent(userAgent);
  
            console.log(`Crawling domain: ${domain}`);
            try {
              await this.retryWithBackoff(() => page.goto(`https://${domain}`, { waitUntil: 'networkidle2' }));
  
              await this.scrollToLoadMore(page);
  
              const universalPatterns = ['/product/', '/item/', '/p/', '/shop/', '/buy/'];
              const urls = await page.evaluate((patterns: string[]) => {
                const links = Array.from(document.querySelectorAll('a'));
                return links
                  .map((link) => (link as HTMLAnchorElement).href)
                  .filter((url) => patterns.some((pattern) => url.includes(pattern)));
              }, universalPatterns);
  
              const uniqueUrls: string[] = Array.from(new Set(urls));
              console.log(`Discovered ${uniqueUrls.length} product URLs on ${domain}`);
  
              try {
                const existingEntry = await this.crawlerRepository.findOne({ domain });
                if (existingEntry) {
                  const allUrls = Array.from(new Set([...existingEntry.discoveredUrls, ...uniqueUrls]));
                  await this.crawlerRepository.update(existingEntry.id.toString(), { discoveredUrls: allUrls });
                } else {
                  await this.crawlerRepository.create({ domain, discoveredUrls: uniqueUrls, isActive: true });
                }
              } catch (error) {
                console.error(`Error updating database for domain: ${domain}`, error.message);
              }
  
              results.push({ domain, urls: uniqueUrls });
            } catch (error) {
              console.error(`Error crawling domain: ${domain}`, error.message);
            } finally {
              await page.close();
            }
          }),
        ),
      );
    } catch (error) {
      console.error('Error during the crawling process', error.message);
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
