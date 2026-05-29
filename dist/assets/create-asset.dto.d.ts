import { AssetStatus } from '../common/enums/asset-status.enum';
export declare class CreateAssetDto {
    assetCode: string;
    assetName: string;
    assetType: string;
    brand?: string;
    model?: string;
    serialNumber?: string;
    purchaseDate?: string;
    warrantyEndDate?: string;
    location?: string;
    conditionNote?: string;
    status?: AssetStatus;
    remarks?: string;
}
