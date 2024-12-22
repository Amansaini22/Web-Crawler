import { ApiProperty } from '@nestjs/swagger';

export class DiscoverDto {
  @ApiProperty({ 
    example: 'example.com',
    description: 'The domain to crawl for product URLs'
	})
  domain: string;
}
