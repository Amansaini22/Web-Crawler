import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  Min,
  IsArray,
  IsObject,
  IsBoolean,
} from 'class-validator';

export class CreateCrawlerDto {
  @ApiProperty({ type: String, description: 'Domain to be crawled' })
  @IsString()
  domain: string;

  @ApiPropertyOptional({
    type: [String],
    description: 'List of initial URLs to crawl',
    example: ['https://example.com/product/1', 'https://example.com/product/2'],
  })
  @IsArray()
  discoveredUrls: string[];

  @ApiPropertyOptional({ type: Number, description: 'Crawl depth', example: 3 })
  @IsOptional()
  @Min(1)
  crawlDepth: number;

  @ApiPropertyOptional({
    type: Object,
    description: 'Rate limit settings',
    example: { min: 1, max: 10 },
  })
  @IsOptional()
  @IsObject()
  rateLimit: {
    min: number;
    max: number;
  };

  @ApiPropertyOptional({
    type: Boolean,
    description: 'Whether the crawler is active',
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  isActive: boolean;

  @ApiPropertyOptional({
    type: Object,
    description: 'Proxy settings',
    example: { host: 'proxy.example.com', port: 8080 },
  })
  @IsOptional()
  @IsObject()
  proxy: {
    host: string;
    port: number;
    username?: string;
    password?: string;
  };
}