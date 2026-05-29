import { Repository } from 'typeorm';
import { AssetStatus } from '../common/enums/asset-status.enum';
import { Asset } from './asset.entity';
import { CreateAssetDto } from './create-asset.dto';
export declare class AssetsService {
    private readonly assetRepo;
    constructor(assetRepo: Repository<Asset>);
    create(organizationId: number, dto: CreateAssetDto): Promise<Asset>;
    findAll(organizationId: number, status?: AssetStatus): Promise<Asset[]>;
    findOne(organizationId: number, id: number): Promise<Asset>;
    updateStatus(organizationId: number, id: number, status: AssetStatus): Promise<Asset>;
}
