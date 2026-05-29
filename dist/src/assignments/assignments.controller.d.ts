import { Request } from 'express';
import { JwtUser } from '../common/decorators/current-user.decorator';
import { AssignmentsService } from './assignments.service';
import { CreateAssignmentDto } from './create-assignment.dto';
import { SignAssignmentDto } from './sign-assignment.dto';
export declare class AssignmentsController {
    private readonly assignmentsService;
    constructor(assignmentsService: AssignmentsService);
    create(currentUser: JwtUser, dto: CreateAssignmentDto): Promise<import("./asset-assignment.entity").AssetAssignment>;
    findAll(currentUser: JwtUser): Promise<import("./asset-assignment.entity").AssetAssignment[]>;
    findMine(currentUser: JwtUser): Promise<import("./asset-assignment.entity").AssetAssignment[]>;
    sign(currentUser: JwtUser, id: string, dto: SignAssignmentDto, req: Request): Promise<import("./asset-assignment.entity").AssetAssignment>;
    requestReturn(currentUser: JwtUser, id: string): Promise<import("./asset-assignment.entity").AssetAssignment>;
}
