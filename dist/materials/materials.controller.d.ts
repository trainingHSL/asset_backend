import { JwtUser } from '../common/decorators/current-user.decorator';
import { CreateMaterialDto } from './create-material.dto';
import { IssueMaterialDto } from './issue-material.dto';
import { MaterialsService } from './materials.service';
export declare class MaterialsController {
    private readonly materialsService;
    constructor(materialsService: MaterialsService);
    create(currentUser: JwtUser, dto: CreateMaterialDto): Promise<import("./material.entity").Material>;
    issue(currentUser: JwtUser, dto: IssueMaterialDto): Promise<import("./material-issue.entity").MaterialIssue>;
    findAll(currentUser: JwtUser): Promise<import("./material.entity").Material[]>;
    inventory(currentUser: JwtUser): Promise<{
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
    issues(currentUser: JwtUser): Promise<import("./material-issue.entity").MaterialIssue[]>;
}
