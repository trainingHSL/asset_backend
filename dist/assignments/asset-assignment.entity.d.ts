import { Asset } from '../assets/asset.entity';
import { User } from '../users/user.entity';
import { Organization } from '../organizations/organization.entity';
import { AssignmentStatus } from '../common/enums/assignment-status.enum';
export declare class AssetAssignment {
    id: number;
    organization: Organization;
    organizationId: number;
    asset: Asset;
    assetId: number;
    user: User;
    userId: number;
    assignedBy: number;
    assignedDate: string;
    expectedReturnDate?: string;
    digitalSignature?: string;
    signedIpAddress?: string;
    signatureDate?: Date;
    status: AssignmentStatus;
    remarks?: string;
    createdAt: Date;
    updatedAt: Date;
}
