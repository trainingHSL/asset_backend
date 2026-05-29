import { Organization } from '../organizations/organization.entity';
import { AssetStatus } from '../common/enums/asset-status.enum';
import { AssetAssignment } from '../assignments/asset-assignment.entity';
export declare class Asset {
    id: number;
    organization: Organization;
    organizationId: number;
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
    status: AssetStatus;
    remarks?: string;
    assignments: AssetAssignment[];
    createdAt: Date;
    updatedAt: Date;
}
