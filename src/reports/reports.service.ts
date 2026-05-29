import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Asset } from '../assets/asset.entity';
import { AssetAssignment } from '../assignments/asset-assignment.entity';
import { AssetReturn } from '../returns/asset-return.entity';
import { Material } from '../materials/material.entity';
import { User } from '../users/user.entity';
import { AssetStatus } from '../common/enums/asset-status.enum';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    @InjectRepository(Asset)
    private readonly assetRepo: Repository<Asset>,
    @InjectRepository(AssetAssignment)
    private readonly assignmentRepo: Repository<AssetAssignment>,
    @InjectRepository(AssetReturn)
    private readonly returnRepo: Repository<AssetReturn>,
    @InjectRepository(Material)
    private readonly materialRepo: Repository<Material>,
  ) {}

  async dashboard(organizationId: number) {
    const [users, assets, assignedAssets, availableAssets, returns, materials, lowStockMaterials] = await Promise.all([
      this.userRepo.count({ where: { organizationId } }),
      this.assetRepo.count({ where: { organizationId } }),
      this.assetRepo.count({ where: { organizationId, status: AssetStatus.ASSIGNED } }),
      this.assetRepo.count({ where: { organizationId, status: AssetStatus.AVAILABLE } }),
      this.returnRepo.count({ where: { organizationId } }),
      this.materialRepo.count({ where: { organizationId } }),
      this.materialRepo
        .createQueryBuilder('material')
        .where('material.organizationId = :organizationId', { organizationId })
        .andWhere('material.availableQuantity <= material.minimumStockLevel')
        .getCount(),
    ]);

    return {
      users,
      assets,
      assignedAssets,
      availableAssets,
      returns,
      materials,
      lowStockMaterials,
    };
  }
}
