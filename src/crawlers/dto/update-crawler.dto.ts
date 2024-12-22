import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  Min,
  IsArray,
  IsObject,
  IsBoolean,
} from 'class-validator';
export class UpdateCrawlerDto {
  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  domain?: string;

  @ApiPropertyOptional({ type: Boolean })
  @IsOptional()
  isActive?: boolean;

  @ApiPropertyOptional({ type: Number })
  @IsOptional()
  @Min(1)
  crawlDepth?: number;

  @ApiPropertyOptional({ type: Object })
  @IsOptional()
  rateLimit?: {
    min: number;
    max: number;
  };

  @ApiPropertyOptional({ type: Object })
  @IsOptional()
  proxy?: {
    host: string;
    port: number;
    username?: string;
    password?: string;
  };
}