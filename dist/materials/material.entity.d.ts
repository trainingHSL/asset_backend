import { Organization } from '../organizations/organization.entity';
import { MaterialIssue } from './material-issue.entity';
export declare class Material {
    id: number;
    organization: Organization;
    organizationId: number;
    materialName: string;
    category: string;
    brand?: string;
    unit: string;
    totalQuantity: number;
    availableQuantity: number;
    minimumStockLevel: number;
    location?: string;
    isActive: boolean;
    issues: MaterialIssue[];
    createdAt: Date;
    updatedAt: Date;
}
