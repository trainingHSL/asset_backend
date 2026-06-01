import { Organization } from '../organizations/organization.entity';
import { Material } from './material.entity';
import { User } from '../users/user.entity';
export declare class MaterialIssue {
    id: number;
    organization: Organization;
    organizationId: number;
    material: Material;
    materialId: number;
    user: User;
    userId: number;
    quantity: number;
    issuedBy: number;
    issuedByUser?: User;
    remarks?: string;
    issueDate: Date;
}
