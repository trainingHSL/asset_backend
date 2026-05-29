import { Organization } from '../organizations/organization.entity';
import { UserRole } from '../common/enums/user-role.enum';
import { AssetAssignment } from '../assignments/asset-assignment.entity';
import { MaterialIssue } from '../materials/material-issue.entity';
export declare class User {
    id: number;
    organization: Organization;
    organizationId: number;
    employeeCode: string;
    name: string;
    email: string;
    phone?: string;
    department?: string;
    designation?: string;
    location?: string;
    password?: string;
    role: UserRole;
    isActive: boolean;
    assignments: AssetAssignment[];
    materialIssues: MaterialIssue[];
    createdAt: Date;
    updatedAt: Date;
}
