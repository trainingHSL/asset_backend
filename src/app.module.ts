import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './auth/auth.module';
import { OrganizationsModule } from './organizations/organizations.module';
import { UsersModule } from './users/users.module';
import { AssetsModule } from './assets/assets.module';
import { AssignmentsModule } from './assignments/assignments.module';
import { ReturnsModule } from './returns/returns.module';
import { MaterialsModule } from './materials/materials.module';
import { ReportsModule } from './reports/reports.module';
import { HealthModule } from './health/health.module';

const toBoolean = (value: string | undefined, fallback = false) => {
  if (value === undefined || value === null || value === '') return fallback;
  return ['true', '1', 'yes', 'y'].includes(value.toLowerCase());
};

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST') || '127.0.0.1',
        port: Number(configService.get<string>('DB_PORT') || 5432),
        username: configService.get<string>('DB_USER') || 'postgres',
        password: configService.get<string>('DB_PASS') ?? '',
        database: configService.get<string>('DB_NAME') || 'asset',
        autoLoadEntities: true,
        synchronize: toBoolean(configService.get<string>('DB_SYNC'), true),
        ssl: toBoolean(configService.get<string>('DB_SSL'), false),
        retryAttempts: Number(configService.get<string>('DB_RETRY_ATTEMPTS') || 5),
        retryDelay: Number(configService.get<string>('DB_RETRY_DELAY') || 3000),
        extra: {
          connectionTimeoutMillis: Number(configService.get<string>('DB_CONNECTION_TIMEOUT') || 10000),
        },
      }),
    }),

    HealthModule,
    AuthModule,
    OrganizationsModule,
    UsersModule,
    AssetsModule,
    AssignmentsModule,
    ReturnsModule,
    MaterialsModule,
    ReportsModule,
  ],
})
export class AppModule {}
