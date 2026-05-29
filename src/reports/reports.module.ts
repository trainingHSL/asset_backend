import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Asset } from '../assets/asset.entity';
import { AssetAssignment } from '../assignments/asset-assignment.entity';
import { AssetReturn } from '../returns/asset-return.entity';
import { Material } from '../materials/material.entity';
import { User } from '../users/user.entity';
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Asset, AssetAssignment, AssetReturn, Material])],
  controllers: [ReportsController],
  providers: [ReportsService],
})
export class ReportsModule {}
