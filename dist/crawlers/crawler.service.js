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
const p_limit_1 = require("p-limit");
let CrawlerService = CrawlerService_1 = class CrawlerService {
    constructor(crawlerRepository) {
        this.crawlerRepository = crawlerRepository;
        this.logger = new common_1.Logger(CrawlerService_1.name);
        this.retryWithBackoff = async (fn, retries = 3, delay = 1000) => {
            let attempt = 0;
            while (attempt < retries) {
                try {
                    return await fn();
                }
                catch (error) {
                    attempt++;
                    if (attempt >= retries)
                        throw error;
                    console.error(`Retrying... Attempt ${attempt}`);
                    await new Promise((resolve) => setTimeout(resolve, delay * attempt));
                }
            }
        };
    }
    async create(createCrawlerDto) {
        return this.crawlerRepository.create(createCrawlerDto);
    }
    getRandomUserAgent() {
        const userAgents = [
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
            'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        ];
        return userAgents[Math.floor(Math.random() * userAgents.length)];
    }
    async discoverProductUrls(domains) {
        const puppeteer = require('puppeteer-extra');
        const StealthPlugin = require('puppeteer-extra-plugin-stealth');
        puppeteer.use(StealthPlugin());
        const browser = await puppeteer.launch({ headless: true });
        const results = [];
        const limit = (0, p_limit_1.default)(5);
        try {
            await Promise.all(domains.map((domain) => limit(async () => {
                const page = await browser.newPage();
                const userAgent = this.getRandomUserAgent();
                await page.setUserAgent(userAgent);
                console.log(`Crawling domain: ${domain}`);
                try {
                    await this.retryWithBackoff(() => page.goto(`https://${domain}`, { waitUntil: 'networkidle2' }));
                    await this.scrollToLoadMore(page);
                    const universalPatterns = ['/product/', '/item/', '/p/', '/shop/', '/buy/'];
                    const urls = await page.evaluate((patterns) => {
                        const links = Array.from(document.querySelectorAll('a'));
                        return links
                            .map((link) => link.href)
                            .filter((url) => patterns.some((pattern) => url.includes(pattern)));
                    }, universalPatterns);
                    const uniqueUrls = Array.from(new Set(urls));
                    console.log(`Discovered ${uniqueUrls.length} product URLs on ${domain}`);
                    try {
                        const existingEntry = await this.crawlerRepository.findOne({ domain });
                        if (existingEntry) {
                            const allUrls = Array.from(new Set([...existingEntry.discoveredUrls, ...uniqueUrls]));
                            await this.crawlerRepository.update(existingEntry.id.toString(), { discoveredUrls: allUrls });
                        }
                        else {
                            await this.crawlerRepository.create({ domain, discoveredUrls: uniqueUrls, isActive: true });
                        }
                    }
                    catch (error) {
                        console.error(`Error updating database for domain: ${domain}`, error.message);
                    }
                    results.push({ domain, urls: uniqueUrls });
                }
                catch (error) {
                    console.error(`Error crawling domain: ${domain}`, error.message);
                }
                finally {
                    await page.close();
                }
            })));
        }
        catch (error) {
            console.error('Error during the crawling process', error.message);
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