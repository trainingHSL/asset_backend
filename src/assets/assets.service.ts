import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AssetStatus } from '../common/enums/asset-status.enum';
import { Asset } from './asset.entity';
import { CreateAssetDto } from './create-asset.dto';

@Injectable()
export class AssetsService {
  constructor(
    @InjectRepository(Asset)
    private readonly assetRepo: Repository<Asset>,
  ) {}

  async create(organizationId: number, dto: CreateAssetDto) {
    const exists = await this.assetRepo.findOne({ where: { organizationId, assetCode: dto.assetCode } });
    if (exists) throw new ConflictException('Asset code already exists');

    return this.assetRepo.save(
      this.assetRepo.create({
        ...dto,
        organizationId,
        status: dto.status || AssetStatus.AVAILABLE,
      }),
    );
  }

  findAll(organizationId: number, status?: AssetStatus) {
    return this.assetRepo.find({
      where: { organizationId, ...(status ? { status } : {}) },
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(organizationId: number, id: number) {
    const asset = await this.assetRepo.findOne({ where: { organizationId, id } });
    if (!asset) throw new NotFoundException('Asset not found');
    return asset;
  }

  async updateStatus(organizationId: number, id: number, status: AssetStatus) {
    const asset = await this.findOne(organizationId, id);
    asset.status = status;
    return this.assetRepo.save(asset);
  }
}
