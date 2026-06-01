import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { CreateMaterialDto } from './create-material.dto';
import { IssueMaterialDto } from './issue-material.dto';
import { Material } from './material.entity';
import { MaterialIssue } from './material-issue.entity';

@Injectable()
export class MaterialsService {
  constructor(
    @InjectRepository(Material)
    private readonly materialRepo: Repository<Material>,
    @InjectRepository(MaterialIssue)
    private readonly materialIssueRepo: Repository<MaterialIssue>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  create(organizationId: number, dto: CreateMaterialDto) {
    return this.materialRepo.save(
      this.materialRepo.create({
        ...dto,
        organizationId,
        availableQuantity: dto.totalQuantity,
      }),
    );
  }

  findAll(organizationId: number) {
    return this.materialRepo.find({ where: { organizationId }, order: { createdAt: 'DESC' } });
  }

  async inventory(organizationId: number) {
    const materials = await this.materialRepo.find({
      where: { organizationId },
      relations: { issues: true },
      order: { createdAt: 'DESC' },
    });

    return materials.map((material) => {
      const totalIssuedQuantity = material.issues?.reduce((sum, issue) => sum + Number(issue.quantity || 0), 0) || 0;
      const currentIssuedQuantity = Math.max(Number(material.totalQuantity || 0) - Number(material.availableQuantity || 0), 0);
      const stockStatus =
        material.availableQuantity <= 0
          ? 'OUT_OF_STOCK'
          : material.availableQuantity <= material.minimumStockLevel
            ? 'LOW_STOCK'
            : 'IN_STOCK';
      const stockPercentage = material.totalQuantity > 0 ? Math.round((material.availableQuantity / material.totalQuantity) * 100) : 0;
      const { issues, ...materialData } = material;

      return {
        ...materialData,
        currentIssuedQuantity,
        totalIssuedQuantity,
        stockStatus,
        stockPercentage,
      };
    });
  }

  async issue(organizationId: number, issuedBy: number, dto: IssueMaterialDto) {
    const material = await this.materialRepo.findOne({ where: { id: dto.materialId, organizationId } });
    if (!material) throw new NotFoundException('Material not found');
    if (material.availableQuantity < dto.quantity) throw new BadRequestException('Insufficient material stock');

    const user = await this.userRepo.findOne({ where: { id: dto.userId, organizationId } });
    if (!user) throw new NotFoundException('User not found');

    material.availableQuantity -= dto.quantity;
    await this.materialRepo.save(material);

    return this.materialIssueRepo.save(
      this.materialIssueRepo.create({
        organizationId,
        materialId: dto.materialId,
        userId: dto.userId,
        quantity: dto.quantity,
        issuedBy,
        remarks: dto.remarks,
      }),
    );
  }

  issues(organizationId: number) {
    return this.materialIssueRepo.find({
      where: { organizationId },
      relations: { material: true, user: true, issuedByUser: true },
      order: { issueDate: 'DESC' },
    });
  }
}
