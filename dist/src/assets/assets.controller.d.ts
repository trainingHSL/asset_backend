import { JwtUser } from '../common/decorators/current-user.decorator';
import { AssetStatus } from '../common/enums/asset-status.enum';
import { AssetsService } from './assets.service';
import { CreateAssetDto } from './create-asset.dto';
export declare class AssetsController {
    private readonly assetsService;
    constructor(assetsService: AssetsService);
    create(currentUser: JwtUser, dto: CreateAssetDto): Promise<import("./asset.entity").Asset>;
    findAll(currentUser: JwtUser, status?: AssetStatus): Promise<import("./asset.entity").Asset[]>;
    findOne(currentUser: JwtUser, id: string): Promise<import("./asset.entity").Asset>;
}
