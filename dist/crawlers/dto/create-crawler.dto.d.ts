export declare class CreateCrawlerDto {
    domain: string;
    discoveredUrls: string[];
    crawlDepth: number;
    rateLimit: {
        min: number;
        max: number;
    };
    isActive: boolean;
    proxy: {
        host: string;
        port: number;
        username?: string;
        password?: string;
    };
}
