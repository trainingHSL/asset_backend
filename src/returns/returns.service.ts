import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Asset } from '../assets/asset.entity';
import { AssetAssignment } from '../assignments/asset-assignment.entity';
import { AssignmentStatus } from '../common/enums/assignment-status.enum';
import { AssetStatus } from '../common/enums/asset-status.enum';
import { AssetReturn } from './asset-return.entity';
import { CreateReturnDto } from './create-return.dto';

@Injectable()
export class ReturnsService {
  constructor(
    @InjectRepository(AssetReturn)
    private readonly returnRepo: Repository<AssetReturn>,
    @InjectRepository(AssetAssignment)
    private readonly assignmentRepo: Repository<AssetAssignment>,
    @InjectRepository(Asset)
    private readonly assetRepo: Repository<Asset>,
  ) {}

  async processReturn(organizationId: number, receivedBy: number, dto: CreateReturnDto) {
    const assignment = await this.assignmentRepo.findOne({
      where: { organizationId, id: dto.assignmentId },
      relations: { asset: true, user: true },
    });
    if (!assignment) throw new NotFoundException('Assignment not found');
    if (assignment.status === AssignmentStatus.RETURNED) throw new BadRequestException('Asset already returned');

    const returnRecord = await this.returnRepo.save(
      this.returnRepo.create({
        organizationId,
        assignmentId: assignment.id,
        assetId: assignment.assetId,
        userId: assignment.userId,
        receivedBy,
        returnDate: dto.returnDate,
        returnCondition: dto.returnCondition,
        damageRemarks: dto.damageRemarks,
        returnSignature: dto.returnSignature,
      }),
    );

    assignment.status = AssignmentStatus.RETURNED;
    await this.assignmentRepo.save(assignment);

    const asset = await this.assetRepo.findOne({ where: { id: assignment.assetId, organizationId } });
    if (asset) {
      asset.status = dto.returnCondition === 'GOOD' ? AssetStatus.AVAILABLE : AssetStatus.DAMAGED;
      asset.conditionNote = dto.damageRemarks || dto.returnCondition;
      await this.assetRepo.save(asset);
    }

    return returnRecord;
  }

  findAll(organizationId: number) {
    return this.returnRepo.find({
      where: { organizationId },
      relations: { asset: true, user: true, assignment: true },
      order: { createdAt: 'DESC' },
    });
  }
}
