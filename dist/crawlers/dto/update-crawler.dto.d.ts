export declare class UpdateCrawlerDto {
    domain?: string;
    isActive?: boolean;
    crawlDepth?: number;
    rateLimit?: {
        min: number;
        max: number;
    };
    proxy?: {
        host: string;
        port: number;
        username?: string;
        password?: string;
    };
}
