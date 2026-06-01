import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import * as XLSX from 'xlsx';
import { User } from './user.entity';
import { CreateUserDto } from './create-user.dto';
import { UserRole } from '../common/enums/user-role.enum';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async create(organizationId: number, dto: CreateUserDto) {
    const email = dto.email.trim().toLowerCase();
    const exists = await this.userRepo.findOne({ where: { email, organizationId } });
    if (exists) throw new ConflictException('User email already exists in this organization');

    const user = this.userRepo.create({
      ...dto,
      email,
      organizationId,
      role: dto.role || UserRole.USER,
      password: dto.password ? await bcrypt.hash(dto.password, 10) : undefined,
    });
    const saved = await this.userRepo.save(user);
    return this.safeUser(saved);
  }

  async importFromExcel(organizationId: number, buffer: Buffer) {
    const workbook = XLSX.read(buffer, { type: 'buffer' });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = XLSX.utils.sheet_to_json<any>(sheet);
    const imported = [];
    const skipped = [];

    for (const row of rows) {
      const dto: CreateUserDto = {
        employeeCode: String(row.employeeCode || row['Employee Code'] || '').trim(),
        name: String(row.name || row.Name || '').trim(),
        email: String(row.email || row.Email || '').trim().toLowerCase(),
        phone: String(row.phone || row.Phone || '').trim(),
        department: String(row.department || row.Department || '').trim(),
        designation: String(row.designation || row.Designation || '').trim(),
        location: String(row.location || row.Location || '').trim(),
        role: UserRole.USER,
      };

      if (!dto.employeeCode || !dto.name || !dto.email) {
        skipped.push({ row, reason: 'employeeCode, name and email are required' });
        continue;
      }

      const exists = await this.userRepo.findOne({ where: { email: dto.email, organizationId } });
      if (exists) {
        skipped.push({ row: dto.email, reason: 'Already exists' });
        continue;
      }

      const user = await this.userRepo.save(this.userRepo.create({ ...dto, organizationId }));
      imported.push(this.safeUser(user));
    }

    return { importedCount: imported.length, skippedCount: skipped.length, imported, skipped };
  }

  async syncFromApi(organizationId: number, users: CreateUserDto[]) {
    const result = [];
    for (const dto of users) {
      const email = dto.email.trim().toLowerCase();
      const existing = await this.userRepo.findOne({ where: { email, organizationId } });
      if (existing) {
        const updateData: Partial<User> = {
          ...dto,
          email,
          organizationId,
          password: dto.password ? await bcrypt.hash(dto.password, 10) : existing.password,
        };
        await this.userRepo.update(existing.id, updateData);
        result.push({ email: dto.email, action: 'updated' });
      } else {
        await this.create(organizationId, dto);
        result.push({ email: dto.email, action: 'created' });
      }
    }
    return { synced: result.length, result };
  }

  findAll(organizationId: number) {
    return this.userRepo.find({ where: { organizationId }, order: { createdAt: 'DESC' } });
  }

  findByEmail(email: string) {
    return this.userRepo.findOne({ where: { email: email.trim().toLowerCase(), isActive: true } });
  }

  async findOne(organizationId: number, id: number) {
    const user = await this.userRepo.findOne({ where: { organizationId, id } });
    if (!user) throw new NotFoundException('User not found');
    return this.safeUser(user);
  }

  safeUser(user: User) {
    const { password, ...safe } = user;
    return safe;
  }
}
