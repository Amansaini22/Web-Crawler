import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNumber,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import { Transform, Type, plainToInstance } from 'class-transformer';
import { Crawler } from '../domain/crawler';

export class FilterCrawlerDto {
  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  domain?: string;

  @ApiPropertyOptional({ type: Boolean })
  @IsOptional()
  isActive?: boolean;
}

export class SortCrawlerDto {
  @ApiProperty()
  @Type(() => String)
  @IsString()
  orderBy: keyof Crawler;

  @ApiProperty()
  @IsString()
  order: 'ASC' | 'DESC';
}

export class QueryCrawlerDto {
  @ApiPropertyOptional()
  @Transform(({ value }) => (value ? Number(value) : 1))
  @IsNumber()
  @Min(1)
  @IsOptional()
  page?: number;

  @ApiPropertyOptional()
  @Transform(({ value }) => (value ? Number(value) : 10))
  @IsNumber()
  @IsOptional()
  limit?: number;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @Transform(({ value }) =>
    value ? plainToInstance(FilterCrawlerDto, JSON.parse(value)) : undefined,
  )
  @ValidateNested()
  @Type(() => FilterCrawlerDto)
  filters?: FilterCrawlerDto | null;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @Transform(({ value }) => {
    return value
      ? plainToInstance(SortCrawlerDto, JSON.parse(value))
      : undefined;
  })
  @ValidateNested({ each: true })
  @Type(() => SortCrawlerDto)
  sort?: SortCrawlerDto[] | null;
}