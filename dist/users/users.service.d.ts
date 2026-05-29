import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './create-user.dto';
import { UserRole } from '../common/enums/user-role.enum';
export declare class UsersService {
    private readonly userRepo;
    constructor(userRepo: Repository<User>);
    create(organizationId: number, dto: CreateUserDto): Promise<{
        id: number;
        organization: import("../organizations/organization.entity").Organization;
        organizationId: number;
        employeeCode: string;
        name: string;
        email: string;
        phone?: string;
        department?: string;
        designation?: string;
        location?: string;
        role: UserRole;
        isActive: boolean;
        assignments: import("../assignments/asset-assignment.entity").AssetAssignment[];
        materialIssues: import("../materials/material-issue.entity").MaterialIssue[];
        createdAt: Date;
        updatedAt: Date;
    }>;
    importFromExcel(organizationId: number, buffer: Buffer): Promise<{
        importedCount: number;
        skippedCount: number;
        imported: {
            id: number;
            organization: import("../organizations/organization.entity").Organization;
            organizationId: number;
            employeeCode: string;
            name: string;
            email: string;
            phone?: string;
            department?: string;
            designation?: string;
            location?: string;
            role: UserRole;
            isActive: boolean;
            assignments: import("../assignments/asset-assignment.entity").AssetAssignment[];
            materialIssues: import("../materials/material-issue.entity").MaterialIssue[];
            createdAt: Date;
            updatedAt: Date;
        }[];
        skipped: {
            row: any;
            reason: string;
        }[];
    }>;
    syncFromApi(organizationId: number, users: CreateUserDto[]): Promise<{
        synced: number;
        result: {
            email: string;
            action: string;
        }[];
    }>;
    findAll(organizationId: number): Promise<User[]>;
    findByEmail(email: string): Promise<User | null>;
    findOne(organizationId: number, id: number): Promise<{
        id: number;
        organization: import("../organizations/organization.entity").Organization;
        organizationId: number;
        employeeCode: string;
        name: string;
        email: string;
        phone?: string;
        department?: string;
        designation?: string;
        location?: string;
        role: UserRole;
        isActive: boolean;
        assignments: import("../assignments/asset-assignment.entity").AssetAssignment[];
        materialIssues: import("../materials/material-issue.entity").MaterialIssue[];
        createdAt: Date;
        updatedAt: Date;
    }>;
    safeUser(user: User): {
        id: number;
        organization: import("../organizations/organization.entity").Organization;
        organizationId: number;
        employeeCode: string;
        name: string;
        email: string;
        phone?: string;
        department?: string;
        designation?: string;
        location?: string;
        role: UserRole;
        isActive: boolean;
        assignments: import("../assignments/asset-assignment.entity").AssetAssignment[];
        materialIssues: import("../materials/material-issue.entity").MaterialIssue[];
        createdAt: Date;
        updatedAt: Date;
    };
}
