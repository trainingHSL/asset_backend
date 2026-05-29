import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Organization } from './organization.entity';
import { CreateOrganizationDto } from './create-organization.dto';

@Injectable()
export class OrganizationsService {
  constructor(
    @InjectRepository(Organization)
    private readonly organizationRepo: Repository<Organization>,
  ) {}

  async create(dto: CreateOrganizationDto) {
    const exists = await this.organizationRepo.findOne({ where: { email: dto.email } });
    if (exists) throw new ConflictException('Organization email already exists');

    const organization = this.organizationRepo.create({
      ...dto,
      password: await bcrypt.hash(dto.password, 10),
    });

    const saved = await this.organizationRepo.save(organization);
    const { password, ...safe } = saved;
    return safe;
  }

  findByEmail(email: string) {
    return this.organizationRepo.findOne({ where: { email } });
  }

  async findOne(id: number) {
    const organization = await this.organizationRepo.findOne({ where: { id } });
    if (!organization) return null;
    const { password, ...safe } = organization;
    return safe;
  }
}
