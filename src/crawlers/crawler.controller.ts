import { Controller, Get, Query, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { CrawlerService } from './crawler.service';
import { CreateCrawlerDto } from './dto/create-crawler.dto';
import { UpdateCrawlerDto } from './dto/update-crawler.dto';
import { Crawler } from './domain/crawler';
import { NullableType } from '@src/utils/types/nullable.type';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Web Crawler')
@Controller('crawler')
export class CrawlerController {
  constructor(private readonly crawlerService: CrawlerService) {}

  @Post('discover')
  async discover(@Body() domains: string[]): Promise<{ domain: string; urls: string[] }[]> {
    return this.crawlerService.discoverProductUrls(domains);
  }

  @Post()
  async createCrawler(@Body() createCrawlerDto: CreateCrawlerDto): Promise<Crawler> {
    return await this.crawlerService.create(createCrawlerDto);
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<NullableType<Crawler>> {
    return this.crawlerService.findById(id);
  }

  @Patch(':id')
  async updateCrawler(@Param('id') id: string, @Body() updateCrawlerDto: UpdateCrawlerDto): Promise<Crawler | null> {
    return this.crawlerService.update(id, updateCrawlerDto);
  }

  @Delete(':id')
  async deleteCrawler(@Param('id') id: string): Promise<void> {
    await this.crawlerService.remove(id);
  }

  @Patch(':id/activate')
  async activateCrawler(@Param('id') id: string): Promise<NullableType<Crawler>> {
    return this.crawlerService.activate(id);
  }

  @Patch(':id/deactivate')
  async deactivateCrawler(@Param('id') id: string): Promise<NullableType<Crawler>> {
    return this.crawlerService.deactivate(id);
  }
}