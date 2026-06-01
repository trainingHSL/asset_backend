import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Asset } from '../assets/asset.entity';
import { AssetAssignment } from '../assignments/asset-assignment.entity';
import { AssetReturn } from '../returns/asset-return.entity';
import { Material } from '../materials/material.entity';
import { MaterialIssue } from '../materials/material-issue.entity';
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
    @InjectRepository(MaterialIssue)
    private readonly materialIssueRepo: Repository<MaterialIssue>,
  ) {}

  async dashboard(organizationId: number) {
    const [users, assets, assignedAssets, availableAssets, returns, materials, materialIssues, issuedMaterialQuantity, lowStockMaterials] = await Promise.all([
      this.userRepo.count({ where: { organizationId } }),
      this.assetRepo.count({ where: { organizationId } }),
      this.assetRepo.count({ where: { organizationId, status: AssetStatus.ASSIGNED } }),
      this.assetRepo.count({ where: { organizationId, status: AssetStatus.AVAILABLE } }),
      this.returnRepo.count({ where: { organizationId } }),
      this.materialRepo.count({ where: { organizationId } }),
      this.materialIssueRepo.count({ where: { organizationId } }),
      this.materialIssueRepo
        .createQueryBuilder('issue')
        .select('COALESCE(SUM(issue.quantity), 0)', 'total')
        .where('issue.organizationId = :organizationId', { organizationId })
        .getRawOne(),
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
      materialIssues,
      issuedMaterialQuantity: Number(issuedMaterialQuantity?.total || 0),
      lowStockMaterials,
    };
  }
}
