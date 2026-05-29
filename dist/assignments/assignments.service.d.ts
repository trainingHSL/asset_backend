import { Repository } from 'typeorm';
import { Asset } from '../assets/asset.entity';
import { User } from '../users/user.entity';
import { AssetAssignment } from './asset-assignment.entity';
import { CreateAssignmentDto } from './create-assignment.dto';
export declare class AssignmentsService {
    private readonly assignmentRepo;
    private readonly assetRepo;
    private readonly userRepo;
    constructor(assignmentRepo: Repository<AssetAssignment>, assetRepo: Repository<Asset>, userRepo: Repository<User>);
    create(organizationId: number, assignedBy: number, dto: CreateAssignmentDto): Promise<AssetAssignment>;
    findAll(organizationId: number): Promise<AssetAssignment[]>;
    findMine(organizationId: number, userId: number): Promise<AssetAssignment[]>;
    findOne(organizationId: number, id: number): Promise<AssetAssignment>;
    sign(organizationId: number, userId: number, id: number, digitalSignature: string, ip?: string): Promise<AssetAssignment>;
    requestReturn(organizationId: number, userId: number, id: number): Promise<AssetAssignment>;
}
