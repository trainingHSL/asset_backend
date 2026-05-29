import { Repository } from 'typeorm';
import { Asset } from '../assets/asset.entity';
import { AssetAssignment } from '../assignments/asset-assignment.entity';
import { AssetReturn } from './asset-return.entity';
import { CreateReturnDto } from './create-return.dto';
export declare class ReturnsService {
    private readonly returnRepo;
    private readonly assignmentRepo;
    private readonly assetRepo;
    constructor(returnRepo: Repository<AssetReturn>, assignmentRepo: Repository<AssetAssignment>, assetRepo: Repository<Asset>);
    processReturn(organizationId: number, receivedBy: number, dto: CreateReturnDto): Promise<AssetReturn>;
    findAll(organizationId: number): Promise<AssetReturn[]>;
}
