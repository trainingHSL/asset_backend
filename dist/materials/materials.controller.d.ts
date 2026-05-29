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
    issues(currentUser: JwtUser): Promise<import("./material-issue.entity").MaterialIssue[]>;
}
