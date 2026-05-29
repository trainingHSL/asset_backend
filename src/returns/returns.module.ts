import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Asset } from '../assets/asset.entity';
import { AssetAssignment } from '../assignments/asset-assignment.entity';
import { AssetReturn } from './asset-return.entity';
import { ReturnsController } from './returns.controller';
import { ReturnsService } from './returns.service';

@Module({
  imports: [TypeOrmModule.forFeature([AssetReturn, AssetAssignment, Asset])],
  controllers: [ReturnsController],
  providers: [ReturnsService],
})
export class ReturnsModule {}
