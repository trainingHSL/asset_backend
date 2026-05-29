import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Asset } from '../assets/asset.entity';
import { AssetStatus } from '../common/enums/asset-status.enum';
import { AssignmentStatus } from '../common/enums/assignment-status.enum';
import { User } from '../users/user.entity';
import { AssetAssignment } from './asset-assignment.entity';
import { CreateAssignmentDto } from './create-assignment.dto';

@Injectable()
export class AssignmentsService {
  constructor(
    @InjectRepository(AssetAssignment)
    private readonly assignmentRepo: Repository<AssetAssignment>,
    @InjectRepository(Asset)
    private readonly assetRepo: Repository<Asset>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async create(organizationId: number, assignedBy: number, dto: CreateAssignmentDto) {
    const asset = await this.assetRepo.findOne({ where: { id: dto.assetId, organizationId } });
    if (!asset) throw new NotFoundException('Asset not found');
    if (asset.status !== AssetStatus.AVAILABLE) throw new BadRequestException('Asset is not available');

    const user = await this.userRepo.findOne({ where: { id: dto.userId, organizationId } });
    if (!user) throw new NotFoundException('User not found');

    const assignment = await this.assignmentRepo.save(
      this.assignmentRepo.create({
        ...dto,
        organizationId,
        assignedBy,
        status: AssignmentStatus.PENDING_SIGNATURE,
      }),
    );

    asset.status = AssetStatus.ASSIGNED;
    await this.assetRepo.save(asset);

    return this.findOne(organizationId, assignment.id);
  }

  findAll(organizationId: number) {
    return this.assignmentRepo.find({
      where: { organizationId },
      relations: { asset: true, user: true },
      order: { createdAt: 'DESC' },
    });
  }

  findMine(organizationId: number, userId: number) {
    return this.assignmentRepo.find({
      where: { organizationId, userId },
      relations: { asset: true },
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(organizationId: number, id: number) {
    const assignment = await this.assignmentRepo.findOne({
      where: { organizationId, id },
      relations: { asset: true, user: true },
    });
    if (!assignment) throw new NotFoundException('Assignment not found');
    return assignment;
  }

  async sign(organizationId: number, userId: number, id: number, digitalSignature: string, ip?: string) {
    const assignment = await this.assignmentRepo.findOne({ where: { organizationId, id, userId } });
    if (!assignment) throw new NotFoundException('Assignment not found');
    if (assignment.status !== AssignmentStatus.PENDING_SIGNATURE) {
      throw new BadRequestException('Assignment cannot be signed now');
    }

    assignment.digitalSignature = digitalSignature;
    assignment.signedIpAddress = ip;
    assignment.signatureDate = new Date();
    assignment.status = AssignmentStatus.ASSIGNED;
    return this.assignmentRepo.save(assignment);
  }

  async requestReturn(organizationId: number, userId: number, id: number) {
    const assignment = await this.assignmentRepo.findOne({ where: { organizationId, id, userId } });
    if (!assignment) throw new NotFoundException('Assignment not found');
    assignment.status = AssignmentStatus.RETURN_REQUESTED;
    return this.assignmentRepo.save(assignment);
  }
}
