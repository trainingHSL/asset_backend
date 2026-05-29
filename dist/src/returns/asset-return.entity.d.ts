import { Organization } from '../organizations/organization.entity';
import { Asset } from '../assets/asset.entity';
import { User } from '../users/user.entity';
import { AssetAssignment } from '../assignments/asset-assignment.entity';
export declare class AssetReturn {
    id: number;
    organization: Organization;
    organizationId: number;
    asset: Asset;
    assetId: number;
    user: User;
    userId: number;
    assignment: AssetAssignment;
    assignmentId: number;
    receivedBy: number;
    returnDate: string;
    returnCondition: string;
    damageRemarks?: string;
    returnSignature?: string;
    createdAt: Date;
}
