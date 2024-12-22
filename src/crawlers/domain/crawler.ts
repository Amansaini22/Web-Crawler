import { IsString, IsOptional, IsBoolean, IsArray, IsObject } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class Crawler {
  @ApiProperty({
    description: 'Unique identifier for the crawler',
    example: '6498e7f2f85a3c00128d9b35',
  })
  @IsString()
  id: string;

  @ApiProperty({
    description: 'Domain being crawled',
    example: 'example.com',
  })
  @IsString()
  domain: string;

  @ApiProperty({
    description: 'List of discovered product URLs',
    example: ['https://example.com/product/123', 'https://example.com/item/456'],
    type: [String],
  })
  @IsArray()
  discoveredUrls: string[];

  @ApiProperty({
    description: 'Indicates whether the crawler is active',
    example: true,
  })
  @IsBoolean()
  isActive: boolean;

  @ApiProperty({
    description: 'Timestamp when the crawler was created',
    example: '2023-08-15T12:34:56.789Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Timestamp when the crawler was last updated',
    example: '2023-08-16T14:21:00.123Z',
  })
  updatedAt: Date;

  @ApiPropertyOptional({
    description: 'Timestamp when the crawler was deleted',
    example: null,
  })
  @IsOptional()
  deletedAt?: Date;

  _id?: string;
}