import { Controller, Get } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Controller('health')
export class HealthController {
  constructor(private readonly dataSource: DataSource) {}

  @Get()
  api() {
    return {
      status: 'ok',
      service: 'IT Asset Management System API',
      timestamp: new Date().toISOString(),
    };
  }

  @Get('database')
  async database() {
    await this.dataSource.query('SELECT 1');
    return {
      status: 'ok',
      database: 'postgres',
      timestamp: new Date().toISOString(),
    };
  }
}
