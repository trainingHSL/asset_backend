import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { Material } from './material.entity';
import { MaterialIssue } from './material-issue.entity';
import { MaterialsController } from './materials.controller';
import { MaterialsService } from './materials.service';

@Module({
  imports: [TypeOrmModule.forFeature([Material, MaterialIssue, User])],
  controllers: [MaterialsController],
  providers: [MaterialsService],
})
export class MaterialsModule {}
