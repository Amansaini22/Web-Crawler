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
var CrawlerService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrawlerService = void 0;
const common_1 = require("@nestjs/common");
const crawler_repository_1 = require("./infrastructure/persistence/crawler.repository");
let CrawlerService = CrawlerService_1 = class CrawlerService {
    constructor(crawlerRepository) {
        this.crawlerRepository = crawlerRepository;
        this.logger = new common_1.Logger(CrawlerService_1.name);
    }
    async create(createCrawlerDto) {
        return this.crawlerRepository.create(createCrawlerDto);
    }
    async discoverProductUrls(domains) {
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
        const results = [];
        try {
            for (const domain of domains) {
                const page = await browser.newPage();
                const userAgent = userAgents[Math.floor(Math.random() * userAgents.length)];
                await page.setUserAgent(userAgent);
                this.logger.log(`Crawling domain: ${domain}`);
                try {
                    await page.goto(`https://${domain}`, { waitUntil: 'networkidle2' });
                    await this.scrollToLoadMore(page);
                    const urls = await page.evaluate(() => {
                        const links = Array.from(document.querySelectorAll('a'));
                        return links
                            .map((link) => link.href)
                            .filter((url) => url.includes('/product/') || url.includes('/item/') || url.includes('/p/') ||
                            url.includes('/shop/') || url.includes('/buy/'));
                    });
                    const uniqueUrls = Array.from(new Set(urls));
                    this.logger.log(`Discovered ${uniqueUrls.length} product URLs on ${domain}`);
                    const existingEntry = await this.crawlerRepository.findOne({ domain: domain });
                    console.log('Existing Entry:', existingEntry);
                    if (existingEntry) {
                        const allUrls = Array.from(new Set([...existingEntry.discoveredUrls, ...uniqueUrls]));
                        await this.crawlerRepository.update(existingEntry.id.toString(), { discoveredUrls: allUrls });
                        this.logger.log(`Updated domain: ${domain} with ${allUrls.length} total URLs`);
                    }
                    else {
                        await this.crawlerRepository.create({
                            domain,
                            discoveredUrls: uniqueUrls,
                            isActive: true,
                        });
                        this.logger.log(`Created new entry for domain: ${domain}`);
                    }
                    results.push({ domain, urls: uniqueUrls });
                    await this.getRandomDelay(2000, 5000);
                }
                catch (error) {
                    this.logger.error(`Error crawling domain: ${domain}`, error.stack);
                }
                finally {
                    await page.close();
                }
            }
        }
        catch (error) {
            this.logger.error('Error during the crawling process', error.stack);
            throw error;
        }
        finally {
            await browser.close();
        }
        return results;
    }
    async scrollToLoadMore(page) {
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
    async getRandomDelay(min, max) {
        const delay = Math.random() * (max - min) + min;
        return new Promise((resolve) => setTimeout(resolve, delay));
    }
    findManyWithPagination({ filterOptions, sortOptions, paginationOptions, }) {
        return this.crawlerRepository.findManyWithPagination({
            filterOptions,
            sortOptions,
            paginationOptions,
        });
    }
    findById(id) {
        return this.crawlerRepository.findById(id);
    }
    findByIds(ids) {
        return this.crawlerRepository.findByIds(ids);
    }
    async update(id, updateCrawlerDto) {
        return this.crawlerRepository.update(id, updateCrawlerDto);
    }
    async remove(id) {
        await this.crawlerRepository.remove(id);
    }
    async activate(id) {
        return this.crawlerRepository.activate(id);
    }
    async deactivate(id) {
        return this.crawlerRepository.deactivate(id);
    }
};
CrawlerService = CrawlerService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [crawler_repository_1.CrawlerRepository])
], CrawlerService);
exports.CrawlerService = CrawlerService;
//# sourceMappingURL=crawler.service.js.map