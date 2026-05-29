import 'multer';
import { JwtUser } from '../common/decorators/current-user.decorator';
import { UserRole } from '../common/enums/user-role.enum';
import { CreateUserDto } from './create-user.dto';
import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(currentUser: JwtUser, dto: CreateUserDto): Promise<{
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
    importExcel(currentUser: JwtUser, file: Express.Multer.File): Promise<{
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
    syncApi(currentUser: JwtUser, body: {
        users: CreateUserDto[];
    }): Promise<{
        synced: number;
        result: {
            email: string;
            action: string;
        }[];
    }>;
    findAll(currentUser: JwtUser): Promise<import("./user.entity").User[]>;
    findOne(currentUser: JwtUser, id: string): Promise<{
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
}
