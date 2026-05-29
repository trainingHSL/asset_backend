"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const bcrypt = __importStar(require("bcryptjs"));
const XLSX = __importStar(require("xlsx"));
const user_entity_1 = require("./user.entity");
const user_role_enum_1 = require("../common/enums/user-role.enum");
let UsersService = class UsersService {
    constructor(userRepo) {
        this.userRepo = userRepo;
    }
    async create(organizationId, dto) {
        const exists = await this.userRepo.findOne({ where: { email: dto.email, organizationId } });
        if (exists)
            throw new common_1.ConflictException('User email already exists in this organization');
        const user = this.userRepo.create({
            ...dto,
            organizationId,
            role: dto.role || user_role_enum_1.UserRole.USER,
            password: dto.password ? await bcrypt.hash(dto.password, 10) : undefined,
        });
        const saved = await this.userRepo.save(user);
        return this.safeUser(saved);
    }
    async importFromExcel(organizationId, buffer) {
        const workbook = XLSX.read(buffer, { type: 'buffer' });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const rows = XLSX.utils.sheet_to_json(sheet);
        const imported = [];
        const skipped = [];
        for (const row of rows) {
            const dto = {
                employeeCode: String(row.employeeCode || row['Employee Code'] || '').trim(),
                name: String(row.name || row.Name || '').trim(),
                email: String(row.email || row.Email || '').trim().toLowerCase(),
                phone: String(row.phone || row.Phone || '').trim(),
                department: String(row.department || row.Department || '').trim(),
                designation: String(row.designation || row.Designation || '').trim(),
                location: String(row.location || row.Location || '').trim(),
                role: user_role_enum_1.UserRole.USER,
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
    async syncFromApi(organizationId, users) {
        const result = [];
        for (const dto of users) {
            const existing = await this.userRepo.findOne({ where: { email: dto.email, organizationId } });
            if (existing) {
                await this.userRepo.update(existing.id, { ...dto, organizationId });
                result.push({ email: dto.email, action: 'updated' });
            }
            else {
                await this.create(organizationId, dto);
                result.push({ email: dto.email, action: 'created' });
            }
        }
        return { synced: result.length, result };
    }
    findAll(organizationId) {
        return this.userRepo.find({ where: { organizationId }, order: { createdAt: 'DESC' } });
    }
    findByEmail(email) {
        return this.userRepo.findOne({ where: { email } });
    }
    async findOne(organizationId, id) {
        const user = await this.userRepo.findOne({ where: { organizationId, id } });
        if (!user)
            throw new common_1.NotFoundException('User not found');
        return this.safeUser(user);
    }
    safeUser(user) {
        const { password, ...safe } = user;
        return safe;
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UsersService);
//# sourceMappingURL=users.service.js.map