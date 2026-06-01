import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { CreateMaterialDto } from './create-material.dto';
import { IssueMaterialDto } from './issue-material.dto';
import { Material } from './material.entity';
import { MaterialIssue } from './material-issue.entity';
export declare class MaterialsService {
    private readonly materialRepo;
    private readonly materialIssueRepo;
    private readonly userRepo;
    constructor(materialRepo: Repository<Material>, materialIssueRepo: Repository<MaterialIssue>, userRepo: Repository<User>);
    create(organizationId: number, dto: CreateMaterialDto): Promise<Material>;
    findAll(organizationId: number): Promise<Material[]>;
    inventory(organizationId: number): Promise<{
        currentIssuedQuantity: number;
        totalIssuedQuantity: number;
        stockStatus: string;
        stockPercentage: number;
        id: number;
        organization: import("../organizations/organization.entity").Organization;
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
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    issue(organizationId: number, issuedBy: number, dto: IssueMaterialDto): Promise<MaterialIssue>;
    issues(organizationId: number): Promise<MaterialIssue[]>;
}
