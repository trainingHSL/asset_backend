import { Repository } from 'typeorm';
import { Asset } from '../assets/asset.entity';
import { AssetAssignment } from '../assignments/asset-assignment.entity';
import { AssetReturn } from '../returns/asset-return.entity';
import { Material } from '../materials/material.entity';
import { User } from '../users/user.entity';
export declare class ReportsService {
    private readonly userRepo;
    private readonly assetRepo;
    private readonly assignmentRepo;
    private readonly returnRepo;
    private readonly materialRepo;
    constructor(userRepo: Repository<User>, assetRepo: Repository<Asset>, assignmentRepo: Repository<AssetAssignment>, returnRepo: Repository<AssetReturn>, materialRepo: Repository<Material>);
    dashboard(organizationId: number): Promise<{
        users: number;
        assets: number;
        assignedAssets: number;
        availableAssets: number;
        returns: number;
        materials: number;
        lowStockMaterials: number;
    }>;
}
