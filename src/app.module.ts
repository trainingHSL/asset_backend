import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './auth/auth.module';
import { OrganizationsModule } from './organizations/organizations.module';
import { UsersModule } from './users/users.module';
import { AssetsModule } from './assets/assets.module';
import { AssignmentsModule } from './assignments/assignments.module';
import { ReturnsModule } from './returns/returns.module';
import { MaterialsModule } from './materials/materials.module';
import { ReportsModule } from './reports/reports.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || '127.0.0.1',
      port: Number(process.env.DB_PORT) || 5432,
      username: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASS || '',
      database: process.env.DB_NAME || 'asset',
      autoLoadEntities: true,
      synchronize: true,
    }),

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