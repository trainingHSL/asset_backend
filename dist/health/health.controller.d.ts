import { DataSource } from 'typeorm';
export declare class HealthController {
    private readonly dataSource;
    constructor(dataSource: DataSource);
    api(): {
        status: string;
        service: string;
        timestamp: string;
    };
    database(): Promise<{
        status: string;
        database: string;
        timestamp: string;
    }>;
}
